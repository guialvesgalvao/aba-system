import { useAppStore } from "../stores/app-store";

export function useToolbar() {
  const { toolbarCollapsed, setToolbarCollapsed } = useAppStore();

  const toggleToolbar = (value?: boolean) => {
    const toggleValue = value ?? !toolbarCollapsed;
    setToolbarCollapsed(toggleValue);
  };

  return {
    isCollapsed: toolbarCollapsed,
    toggleToolbar,
  };
}
