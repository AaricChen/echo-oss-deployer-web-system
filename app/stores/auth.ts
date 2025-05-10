import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthState {
  accessToken: string;
  refreshToken: string;
}

export interface AuthAction {
  updateAuthToken: (token: AuthState) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set) => ({
      accessToken: "",
      refreshToken: "",
      updateAuthToken: (token) => set({ ...token }),
      logout: () => set({ accessToken: "", refreshToken: "" }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
