import {
  type DefaultError,
  type QueryKey,
  type UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { pickBy } from "lodash";
import { type ReactNode, useMemo } from "react";
import { useSnackbar } from "~/hooks/snackbar";
import { useApiStore } from "~/stores/api.js";
import { useAuthStore } from "~/stores/auth.js";
import type {
  EntityIdType,
  EntityQuery,
  EntityResponse,
} from "~/types/entity.js";
import type { PaginationData, PaginationQuery } from "~/types/pagination.js";

export interface HttpMutationRequestParams<Request, Response> {
  method: "POST" | "PUT" | "DELETE";
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
  >;
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
      sort: request.sort.map((it) => `${it.field},${it.direction}`),
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
          if (!res.ok) {
            throw res;
          }
          const contentType = res.headers.get("Content-Type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            return res.json() as Promise<GetResponse>;
          } else {
            return res.text() as Promise<GetResponse>;
          }
        })
        .then((res) => {
          if (request.converter) {
            return request.converter(res);
          }
          return res as Promise<Res>;
        })
        .catch(async (err) => {
          let content;
          try {
            content = await err.json();
          } catch {
            throw new Error("Network Error");
          }
          throw new Error(content.error);
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
  const { info, success, warning, error } = useSnackbar();
  const { endpoint } = useApiStore();
  const { accessToken } = useAuthStore();

  return useMutation<Response, DefaultError, Request>({
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
          if (!res.ok) {
            throw res;
          }
          const contentType = res.headers.get("Content-Type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            return res.json() as Promise<Response>;
          } else {
            return res.text() as Promise<Response>;
          }
        })
        .catch(async (err) => {
          let content;
          try {
            content = await err.json();
          } catch {
            throw new Error("Network Error");
          }
          throw new Error(content.error);
        });
    },
    onSuccess: async (response, request) => {
      if (action) {
        const finalAction =
          typeof action === "string" ? action : action(response, request);
        if (finalAction) {
          switch (actionLevel) {
            case "info":
              info(`${finalAction}${actionSuffix}`);
              break;
            case "success":
              success(`${finalAction}${actionSuffix}`);
              break;
            case "warning":
              warning(`${finalAction}${actionSuffix}`);
              break;
            case "error":
              error(`${finalAction}${actionSuffix}`);
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
