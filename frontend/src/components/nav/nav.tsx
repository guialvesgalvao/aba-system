import { useLocation } from "react-router-dom";

import { NavButton } from "./nav-button";

export type AppRoute = {
  icon: React.ComponentType<{ className?: string }>;
  to: string;
  text: string;
  tooltip?: string;
};

interface INavProps {
  routes: AppRoute[];
}

export function Nav(props: Readonly<INavProps>) {
  const { routes } = props;

  const { pathname } = useLocation();

  return (
    <nav className="w-full flex md:flex-col items-center px-2 gap-3 sm:py-5 transition-colors">
      {routes?.map((button) => (
        <NavButton key={button.to} currentPath={pathname} {...button} />
      ))}
    </nav>
  );
}
