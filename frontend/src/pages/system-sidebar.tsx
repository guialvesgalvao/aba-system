import { AppRoute } from "@/components/nav/nav";

import { useSidebar } from "@/shared/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { CollapseButton } from "@/components/collapse-button/collapse-button";

import { SidebarHeader } from "@/components/sidebar/sidebar-header";
import { SidebarRoutes } from "@/components/sidebar/sidebar-routes";

interface ISystemSidebarProps {
  routes: AppRoute[];
}

export function SystemSidebar(props: Readonly<ISystemSidebarProps>) {
  const { routes } = props;
  const { isCollapsed } = useSidebar();

  return (
    <aside
      className={cn(
        "bg-background w-full h-full group flex flex-col gap-4 data-[collapsed=true]:py-2 border-r fixed transition z-50 border-b md:border-b-0 max-h-20 md:max-h-none",
        isCollapsed ? "md:max-w-20" : "md:max-w-52"
      )}
    >
      <SidebarHeader routes={routes} />
      <SidebarRoutes routes={routes} />

      <div className="top-1/2 -right-3 absolute hidden md:flex">
        <CollapseButton />
      </div>
    </aside>
  );
}
