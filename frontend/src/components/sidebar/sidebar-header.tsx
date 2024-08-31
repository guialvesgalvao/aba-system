import { NavMenu } from "../nav-menu/nav-menu";
import { AppRoute } from "../nav/nav";
import { UserAvatar } from "../user-avatar/user-avatar";

interface ISidebarHeaderProps {
  routes: AppRoute[];
}

export function SidebarHeader(props: Readonly<ISidebarHeaderProps>) {
  const { routes } = props;

  return (
    <div id="sidebar-header" className="w-full h-full flex items-center justify-between md:hidden px-6">
      <NavMenu routes={routes} />

      <div className="flex items-center justify-center py-2">
        <UserAvatar
          image=""
          fallback={{
            delay: 300,
            initials: "ADM",
          }}
        />
      </div>
    </div>
  );
}
