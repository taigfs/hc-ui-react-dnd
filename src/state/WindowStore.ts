import { create } from "zustand";
import { MosaicBranch } from 'react-mosaic-component';

interface Window {
  id: string;
  path: MosaicBranch[];
}

interface WindowState {
  windows: Window[];
  openWindow: (window: Window) => void;
  closeWindow: (id: string) => void;
  setWindows: (windows: Window[]) => void;
}

export const useWindowStore = create<WindowState>((set) => ({
  windows: [
    {
      id: 'toolbars',
      path: ['first'],
    },
    {
      id: 'board',
      path: ['second', 'first'],
    },
    {
      id: 'console',
      path: ['second', 'second'],
    },
  ],
  openWindow: (window) => set((state) => ({ windows: [...state.windows, window] })),
  closeWindow: (id) => set((state) => ({ windows: state.windows.filter((window) => window.id !== id) })),
  setWindows: (windows) => set(() => ({ windows })),
}));
