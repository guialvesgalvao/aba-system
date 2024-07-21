import { GithubIcon } from "lucide-react";

import { AppRoute, Nav } from "@/components/nav/nav";
import { Logo } from "@/components/logo/logo";
import { Separator } from "@/components/ui/separator";
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
        "bg-white w-full h-full group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 border-r fixed transition z-50",
        isCollapsed ? "max-w-20" : "max-w-52"
      )}
    >
      <div className="w-full h-full flex flex-col">
        <Logo icon={<GithubIcon size={32} />} to="/" />
        <Separator className="mb-2" />
        <Nav routes={routes} />

        <div className="flex items-center justify-center mt-auto">
          <UserAvatar />
        </div>
      </div>

      <div className="top-1/2 -right-3 absolute">
        <CollapseButton />
      </div>
    </aside>
  );
}
