import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ExecutionLog } from "../types/execution-log.type";

interface ExecutionState {
  messages: ExecutionLog[];
  setMessages: (messages: ExecutionLog[]) => void;
  addMessage: (message: ExecutionLog) => void;
  clearMessages: () => void;
}

export const useExecutionStore = create<ExecutionState>()(
  persist(
    (set) => ({
      messages: [],
      setMessages: (messages: ExecutionLog[]) => set(() => ({ messages })),
      addMessage: (message: ExecutionLog) =>
        set((state) => ({ messages: [...state.messages, message] })),
      clearMessages: () => set(() => ({ messages: [] })),
    }),
    {
      name: "execution-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
