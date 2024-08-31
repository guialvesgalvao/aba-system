import { create } from "zustand";

export type ThemeColor = "dark" | "light" | "system";

interface IAppStore {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;

  toolbarCollapsed: boolean;
  setToolbarCollapsed: (open: boolean) => void;

  theme: string;
  setTheme: (theme: ThemeColor) => void;
}

const collapsed = JSON.parse(
  localStorage.getItem("aba-system-app:collapsed") ?? "true"
);

const toolbar = JSON.parse(
  localStorage.getItem("aba-system-app:toolbar") ?? "true"
);

const theme = localStorage.getItem("aba-system-app:theme") ?? "light";

export const useAppStore = create<IAppStore>((set) => ({
  sidebarCollapsed: collapsed,

  setSidebarCollapsed: (collapsed: boolean) =>
    set({ sidebarCollapsed: collapsed }),

  toolbarCollapsed: toolbar,
  setToolbarCollapsed: (open: boolean) => set({ toolbarCollapsed: open }),

  theme,
  setTheme: (theme: ThemeColor) => {
    localStorage.setItem("aba-system-app:theme", theme);
    set({ theme });
  },
}));
