import type { ParamsType } from "@ant-design/pro-components";
import {
  type DefaultError,
  type QueryKey,
  type UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { App } from "antd";
import type { SortOrder } from "antd/lib/table/interface";
import { pickBy } from "lodash";
import { type ReactNode, useMemo } from "react";
import { useApiStore } from "~/stores/api";
import { useAuthStore } from "~/stores/auth";
import type { EntityIdType, EntityQuery, EntityResponse } from "~/types/entity";
import { HttpError, type HttpResponse } from "~/types/http";
import type { PaginationData, PaginationQuery } from "~/types/pagination";

export interface HttpMutationRequestParams<Request, Response> {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string | ((request: Request) => string);
  noAuth?: boolean;
  action?: string | ((response: Response, request: Request) => string);
  actionSuffix?: ReactNode;
  actionLevel?: "info" | "success" | "warning" | "error";
  onSuccess?: (response: Response, request: Request) => Promise<void>;
  onError?: (error: DefaultError, request: Request) => Promise<void>;
}

export interface GetRequest<Res, GetResponse = Res> {
  queryKey: QueryKey;
  url: string;
  params?: Record<string, unknown>;
  noAuth?: boolean;
  options?: Omit<
    UseQueryOptions<unknown, DefaultError, Res>,
    "queryKey" | "queryFn"
  > & {
    ignoreError?: boolean;
  };
  converter?: (response: GetResponse) => Promise<Res>;
}

export function usePaginationQuery<
  Request extends EntityQuery,
  Response extends EntityResponse<EntityIdType>,
>(url: string, queryKey: string, request: PaginationQuery<Request>) {
  const { query } = request;
  const params: Record<string, unknown> = useMemo(() => {
    return {
      page: request.page - 1,
      size: request.size,
      sort: request.sort?.map((it) => `${it.field},${it.direction}`),
      ...query,
    };
  }, [request]);

  return useGet<PaginationData<Response>>({
    queryKey: [queryKey, request],
    url,
    params,
  });
}

export function useGet<Res, GetResponse = Res>(
  request: GetRequest<Res, GetResponse>,
) {
  const { message } = App.useApp();
  const { endpoint } = useApiStore();
  const { accessToken } = useAuthStore();
  return useQuery<unknown, DefaultError, Res>({
    queryKey: request.queryKey,
    queryFn: async () => {
      const headers: HeadersInit = {};
      let finalUrl = `${endpoint}${request.url}`;

      if (request.params) {
        const params = request.params;
        const requestParams: { name: string; value: string }[] = [];
        if (params) {
          Object.keys(pickBy(params, (v) => !!v)).forEach((k) => {
            const value = params[k];
            if (Array.isArray(value)) {
              value.forEach((v) => requestParams.push({ name: k, value: v }));
            } else {
              requestParams.push({ name: k, value: String(value) });
            }
          });
        }
        finalUrl += `?${new URLSearchParams(requestParams.map((it) => `${it.name}=${it.value}`).join("&")).toString()}`;
      }

      if (!request.noAuth) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      return fetch(finalUrl, {
        method: "GET",
        headers,
      })
        .then((res) => {
          const contentType = res.headers.get("Content-Type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            return res.json() as Promise<HttpResponse<GetResponse>>;
          } else {
            return res.text() as unknown as Promise<HttpResponse<GetResponse>>;
          }
        })
        .then((res) => {
          if (res.success) {
            if (request.converter) {
              return request.converter(res.data);
            }
            return res.data as Promise<Res>;
          } else {
            throw new HttpError(res);
          }
        })
        .catch(async (err) => {
          if (request.options?.ignoreError) {
            throw err;
          }
          if (err instanceof HttpError) {
            message.error(err.response.message);
          } else {
            message.error("服务器开小差了，请稍后再试");
          }
          throw err;
        });
    },
    ...request.options,
  });
}

export function useHttpMutation<Request, Response>({
  method,
  url,
  noAuth,
  action,
  actionSuffix = "成功",
  actionLevel = "success",
  onSuccess,
  onError,
}: HttpMutationRequestParams<Request, Response>) {
  const { message } = App.useApp();
  const { endpoint } = useApiStore();
  const { accessToken } = useAuthStore();

  return useMutation<Response, HttpError, Request>({
    mutationFn: async (request) => {
      const headers: HeadersInit = {};
      headers["Content-Type"] = "application/json";

      if (!noAuth) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      // Parse request data
      let data = null;

      if (request) {
        if (typeof request === "string") {
          data = request;
        } else {
          data = JSON.stringify(request);
        }
      }

      const finalUrl = typeof url === "string" ? url : url(request);

      return fetch(`${endpoint}${finalUrl}`, {
        method: method,
        headers,
        body: data,
      })
        .then((res) => {
          const contentType = res.headers.get("Content-Type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            return res.json() as Promise<HttpResponse<Response>>;
          } else {
            return res.text() as unknown as Promise<HttpResponse<Response>>;
          }
        })
        .then((res) => {
          if (res.success) {
            return res.data;
          } else {
            throw new HttpError(res);
          }
        })
        .catch(async (err) => {
          if (!(err instanceof HttpError)) {
            message.error("服务器开小差了，请稍后再试");
          }
          throw err;
        });
    },
    onSuccess: async (response, request) => {
      if (action) {
        const finalAction =
          typeof action === "string" ? action : action(response, request);
        if (finalAction) {
          switch (actionLevel) {
            case "info":
              message.info(`${finalAction}${actionSuffix}`);
              break;
            case "success":
              message.success(`${finalAction}${actionSuffix}`);
              break;
            case "warning":
              message.warning(`${finalAction}${actionSuffix}`);
              break;
            case "error":
              message.error(`${finalAction}${actionSuffix}`);
              break;
          }
        }
      }
      if (onSuccess) {
        onSuccess(response, request);
      }
    },
    onError: async (requestError, request) => {
      if (onError) {
        onError(requestError, request);
      } else {
        const response = requestError.response;
        if (response.error) {
          let content = "";
          if (response.error.objectErrors) {
            content += response.error.objectErrors
              .map((it) => `${it.name}: ${it.message}`)
              .join("\n");
          }
          if (response.error.fieldErrors) {
            content += response.error.fieldErrors
              .map((it) => `${it.name}: ${it.message}`)
              .join("\n");
          }
          message.error(content);
        } else {
          message.error(response.message);
        }
      }
    },
  });
}

export function usePost<Request, Response>(
  params: Omit<HttpMutationRequestParams<Request, Response>, "method">,
) {
  return useHttpMutation({ method: "POST", ...params });
}

export function usePut<Request, Response>(
  params: Omit<HttpMutationRequestParams<Request, Response>, "method">,
) {
  return useHttpMutation({ method: "PUT", ...params });
}

export function useDelete<Request, Response>(
  params: Omit<HttpMutationRequestParams<Request, Response>, "method">,
) {
  return useHttpMutation({ method: "DELETE", ...params });
}

export function useTableRequest<
  Response extends EntityResponse<EntityIdType>,
  Params extends ParamsType = ParamsType,
>(url: string) {
  const { message } = App.useApp();
  const { endpoint } = useApiStore();
  const { accessToken } = useAuthStore();

  return useMutation<
    {
      data: Response[];
      success: boolean;
      total: number;
    },
    DefaultError,
    {
      params: Params & {
        pageSize?: number;
        current?: number;
        keyword?: string;
      };
      sort?: Record<string, SortOrder>;
      filter?: Record<string, (string | number)[] | null>;
    }
  >({
    mutationFn: async (request) => {
      const headers: HeadersInit = {};
      headers["Authorization"] = `Bearer ${accessToken}`;
      let finalUrl = `${endpoint}${url}`;

      const { pageSize, current, keyword, ...params } = request.params;

      const requestObject = {
        ...params,
        page: current ? current - 1 : 0,
        size: pageSize,
        keyword,
        sort: request.sort
          ? Object.entries(request.sort).map(
              ([key, value]) => `${key},${value === "ascend" ? "asc" : "desc"}`,
            )
          : null,
        ...request.filter,
      };

      const requestParams: { name: string; value: string }[] = [];
      if (requestObject) {
        Object.keys(pickBy(requestObject, (v) => !!v)).forEach((k) => {
          const value = requestObject[k];
          if (Array.isArray(value)) {
            value.forEach((v: any) =>
              requestParams.push({ name: k, value: v }),
            );
          } else {
            requestParams.push({ name: k, value: String(value) });
          }
        });
      }

      finalUrl += `?${new URLSearchParams(requestParams.map((it) => `${it.name}=${it.value}`).join("&")).toString()}`;

      return fetch(finalUrl, {
        method: "GET",
        headers,
      })
        .then((res) => {
          const contentType = res.headers.get("Content-Type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            return res.json() as Promise<
              HttpResponse<PaginationData<Response>>
            >;
          } else {
            return res.text() as unknown as Promise<
              HttpResponse<PaginationData<Response>>
            >;
          }
        })
        .then((res) => {
          if (res.success) {
            return {
              data: res.data.content,
              success: res.success,
              total: res.data.page.totalElements,
            };
          } else {
            throw new HttpError(res);
          }
        })
        .catch(async (err) => {
          if (err instanceof HttpError) {
            message.error(err.response.message);
          } else {
            message.error("服务器开小差了，请稍后再试");
          }
          throw err;
        });
    },
  });
}
