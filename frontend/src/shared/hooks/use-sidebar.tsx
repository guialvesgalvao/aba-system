import { useAppStore } from "../stores/app-store";

export function useSidebar() {
  const { sidebarCollapsed, setSidebarCollapsed } = useAppStore();

  const toggleSidebar = (value?: boolean) => {
    const toggleValue = value ?? !sidebarCollapsed;

    localStorage.setItem(
      "aba-system-app:collapsed",
      JSON.stringify(toggleValue)
    );
    setSidebarCollapsed(toggleValue);
  };

  return {
    isCollapsed: sidebarCollapsed,
    toggleSidebar,
  };
}
