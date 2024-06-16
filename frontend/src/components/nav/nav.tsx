import { useLocation } from "react-router-dom";

import { NavButton } from "./nav-button";

export type AppRoute = {
  icon: JSX.Element;
  to: string;
  text: string;
  tooltip?: string;
};

interface INavProps {
  routes: AppRoute[];
}

export function Nav(props: INavProps) {
  const { routes } = props;

  const { pathname } = useLocation();

  return (
    <nav className="w-full flex flex-col items-center gap-3 px-2 sm:py-5">
      {routes?.map((button, index) => (
        <NavButton key={index} currentPath={pathname} {...button} />
      ))}
    </nav>
  );
}
