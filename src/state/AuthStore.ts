import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { User } from "../interfaces/User";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set(() => ({ user })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
