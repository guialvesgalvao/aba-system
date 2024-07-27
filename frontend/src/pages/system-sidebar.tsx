import { AppRoute, Nav } from "@/components/nav/nav";
import { Logo } from "@/components/logo/logo";

import { useSidebar } from "@/shared/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { CollapseButton } from "@/components/collapse-button/collapse-button";
import { UserAvatar } from "@/components/user-avatar/user-avatar";

interface ISystemSidebarProps {
  routes: AppRoute[];
}

export function SystemSidebar(props: Readonly<ISystemSidebarProps>) {
  const { routes } = props;
  const { isCollapsed } = useSidebar();

  return (
    <aside
      className={cn(
        "bg-white w-full h-full group flex flex-col gap-4 data-[collapsed=true]:py-2 border-r fixed transition z-50 border-b md:border-b-0 max-h-20 md:max-h-none",
        isCollapsed ? "md:max-w-20" : "md:max-w-52"
      )}
    >
      <div className="w-full h-full flex md:flex-col gap-4">
        <Logo to="/" />

        <Nav routes={routes} />

        <div className="hidden md:flex items-center justify-center mt-auto py-2">
          <UserAvatar />
        </div>
      </div>

      <div className="top-1/2 -right-3 absolute hidden md:flex">
        <CollapseButton />
      </div>
    </aside>
  );
}
