import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useSearchParam } from "react-use";
import { useHttpMutation } from "~/hooks/http";
import { useAuthStore } from "~/stores/auth";
import type { LoginRequest, LoginResponse } from "~/types/auth";

export function useLogin() {
  const navigate = useNavigate();
  const redirect = useSearchParam("redirect");
  const { updateAuthToken } = useAuthStore();
  const queryClient = useQueryClient();

  return useHttpMutation<LoginRequest, LoginResponse>({
    method: "POST",
    url: "/auth/authenticate",
    action: "登录",
    noAuth: true,
    onSuccess: async (data) => {
      updateAuthToken(data);
      queryClient.invalidateQueries({ queryKey: ["current-account"] });
      navigate(redirect || "/");
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const { logout: logoutTokens } = useAuthStore();
  return useMutation({
    mutationFn: async () => {
      logoutTokens();
    },
    onSuccess: () => {
      navigate("/login");
    },
  });
}
