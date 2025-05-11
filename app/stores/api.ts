import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ApiStore {
  endpoint: string;
  defaultQueryField: string;
  updateEndpoint: (endpoint: string) => void;
}

export const useApiStore = create<ApiStore>()(
  persist(
    (set) => ({
      endpoint: 'http://localhost:8080',
      defaultQueryField: 'content',
      updateEndpoint: (endpoint: string) => set({ endpoint }),
    }),
    {
      name: 'api-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ endpoint: state.endpoint }),
    },
  ),
);
