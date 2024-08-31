import { Logo } from "../logo/logo";
import { AppRoute, Nav } from "../nav/nav";
import { useSidebar } from "@/shared/hooks/use-sidebar";
import { UserAvatar } from "../user-avatar/user-avatar";

interface ISidebarRoutesProps {
  routes: AppRoute[];
}

export function SidebarRoutes(props: Readonly<ISidebarRoutesProps>) {
  const { routes } = props;
  const { isCollapsed } = useSidebar();

  return (
    <div id="sidebar-routes" className="w-full h-full hidden md:flex md:flex-col gap-2">
      <Logo to="/" />

      <Nav routes={routes} />

      <div className="hidden md:flex items-center mt-auto py-2 px-4 gap-2">
        <UserAvatar
          image=""
          name={{
            text: "Admin",
            enabled: !isCollapsed,
          }}
          fallback={{
            delay: 300,
            initials: "ADM",
          }}
        />
      </div>
    </div>
  );
}
