import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { appConfig } from "~/configs/app";
export interface ApiStore {
  endpoint: string;
  defaultQueryField: string;
  updateEndpoint: (endpoint: string) => void;
}

export const useApiStore = create<ApiStore>()(
  persist(
    (set) => ({
      endpoint: appConfig.api.endpoint,
      defaultQueryField: "content",
      updateEndpoint: (endpoint: string) => set({ endpoint }),
    }),
    {
      name: "api-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ endpoint: state.endpoint }),
    },
  ),
);
