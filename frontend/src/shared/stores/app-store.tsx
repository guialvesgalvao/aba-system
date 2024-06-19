import { create } from "zustand";

interface IAppStore {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const collapsed = JSON.parse(
  localStorage.getItem("aba-system-app:collapsed") ?? "true"
);

export const useAppStore = create<IAppStore>((set) => ({
  sidebarCollapsed: collapsed,

  setSidebarCollapsed: (collapsed: boolean) =>
    set({ sidebarCollapsed: collapsed }),
}));
