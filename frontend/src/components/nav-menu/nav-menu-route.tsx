import { Link } from "react-router-dom";
import { AppRoute } from "../nav/nav";
import { createElement } from "react";
import { cn } from "@/lib/utils";

interface INavMenuRouteProps extends AppRoute {
  currentPath: string;
  handleMenuControl: (value: boolean) => void;
}

export function NavMenuRoute(props: Readonly<INavMenuRouteProps>) {
  const { currentPath, to, icon, text, handleMenuControl } = props;

  const isPathSelect = currentPath === to;

  return (
    <Link
      to={to}
      className={cn(
        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all",
        isPathSelect
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground "
      )}
      onClick={() => handleMenuControl(false)}
    >
      {createElement(icon, {
        className: "h-6 w-6",
      })}
      {text}
    </Link>
  );
}
