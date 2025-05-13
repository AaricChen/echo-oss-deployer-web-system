import { useNavigate } from "react-router";
import { useSearchParam } from "react-use";
import { useHttpMutation } from "~/hooks/http";
import { useAuthStore } from "~/stores/auth";
import type { LoginRequest, LoginResponse } from "~/types/auth";

export function useLogin() {
  const navigate = useNavigate();
  const redirect = useSearchParam("redirect");
  const { updateAuthToken } = useAuthStore();

  return useHttpMutation<LoginRequest, LoginResponse>({
    method: "POST",
    url: "/auth/login",
    action: "登录",
    noAuth: true,
    onSuccess: async (data) => {
      updateAuthToken(data);
      navigate(redirect || "/");
    },
  });
}
