import { create } from "zustand";

interface Window {
  id: string;
  count: number;
  path: MosaicBranch[];
  totalWindowCount: number;
}

interface WindowState {
  windows: Window[];
  openWindow: (window: Window) => void;
  closeWindow: (id: string) => void;
  setWindows: (windows: Window[]) => void;
}

export const useWindowStore = create<WindowState>((set) => ({
  windows: [],
  openWindow: (window) => set((state) => ({ windows: [...state.windows, window] })),
  closeWindow: (id) => set((state) => ({ windows: state.windows.filter((window) => window.id !== id) })),
  setWindows: (windows) => set(() => ({ windows })),
}));
