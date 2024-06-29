import { useAppStore } from "../stores/app-store";

export function useSidebar() {
  const { sidebarCollapsed, setSidebarCollapsed } = useAppStore();

  const toggleSidebar = () => {
    localStorage.setItem(
      "aba-system-app:collapsed",
      JSON.stringify(!sidebarCollapsed)
    );
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return {
    isCollapsed: sidebarCollapsed,
    toggleSidebar,
  };
}
