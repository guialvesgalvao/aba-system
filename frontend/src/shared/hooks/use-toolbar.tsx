import { useAppStore } from "../stores/app-store";

export function useToolbar() {
  const { toolbarCollapsed, setToolbarCollapsed } = useAppStore();

  const toggleToolbar = (value?: boolean) => {
    const toggleValue = value ?? !toolbarCollapsed;

    localStorage.setItem(
      "aba-system-app:toolbar",
      JSON.stringify(toggleValue)
    );
    setToolbarCollapsed(toggleValue);
  };

  return {
    isCollapsed: toolbarCollapsed,
    toggleToolbar,
  };
}
