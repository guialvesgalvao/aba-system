import { create } from "zustand";

interface IAppStore {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;

  toolbarCollapsed: boolean;
  setToolbarCollapsed: (open: boolean) => void;
}

const collapsed = JSON.parse(
  localStorage.getItem("aba-system-app:collapsed") ?? "true"
);

const toolbar = JSON.parse(
  localStorage.getItem("aba-system-app:toolbar") ?? "true"
);

export const useAppStore = create<IAppStore>((set) => ({
  sidebarCollapsed: collapsed,

  setSidebarCollapsed: (collapsed: boolean) =>
    set({ sidebarCollapsed: collapsed }),

  toolbarCollapsed: toolbar,
  setToolbarCollapsed: (open: boolean) => set({ toolbarCollapsed: open }),
}));
