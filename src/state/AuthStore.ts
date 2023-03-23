import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { User } from "../interfaces/User";

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set(() => ({ user })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
