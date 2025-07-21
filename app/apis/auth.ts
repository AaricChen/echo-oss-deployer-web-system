import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useSearchParam } from "react-use";
import { useGet, useHttpMutation, usePost } from "~/hooks/http";
import { useAuthStore } from "~/stores/auth";
import type {
  AuthenticationConfigResponse,
  AuthRequest,
  AuthResponse,
} from "~/types/auth";

export function useLogin() {
  const navigate = useNavigate();
  const redirect = useSearchParam("redirect");
  const { updateAuthToken } = useAuthStore();
  const queryClient = useQueryClient();

  return useHttpMutation<AuthRequest, AuthResponse>({
    method: "POST",
    url: "/auth/authenticate",
    action: "登录",
    noAuth: true,
    onSuccess: async (data) => {
      updateAuthToken(data);
      queryClient.invalidateQueries({
        queryKey: ["current-account"],
      });
      queryClient.invalidateQueries({
        queryKey: ["sidebar-menu"],
      });
      navigate(redirect || "/");
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const { logout: logoutTokens } = useAuthStore();
  const { mutateAsync: logout } = usePost({
    url: "/auth/logout",
    action: "退出登录",
  });
  return useMutation({
    mutationFn: async () => {
      await logout({});
      logoutTokens();
    },
    onSuccess: () => {
      navigate("/login");
    },
  });
}

export function useAuthenticationConfig() {
  return useGet<AuthenticationConfigResponse>({
    queryKey: ["authentication-config"],
    url: "/auth/config",
    options: {
      staleTime: Infinity,
    },
  });
}
