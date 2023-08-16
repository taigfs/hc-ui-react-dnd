import { create } from "zustand";
import { MosaicBranch, MosaicNode } from 'react-mosaic-component';

interface Window {
  id: string;
  path: MosaicBranch[];
}

interface WindowState {
  mosaicNodes: MosaicNode<string> | null;
  setMosaicNodes: (mosaicNode: MosaicNode<string>) => void;
  // openWindow: (window: Window) => void;
  // closeWindow: (id: string) => void;
}

export const useWindowStore = create<WindowState>((set) => ({
  mosaicNodes: null,
  setMosaicNodes: (mosaicNodes) => set(() => ({ mosaicNodes })),
  // openWindow: (window) => set((state) => ({ windows: [...state.windows, window] })),
  // closeWindow: (id) => set((state) => ({ windows: state.windows.filter((window) => window.id !== id) })),
}));
