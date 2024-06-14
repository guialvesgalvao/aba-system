import { Package, GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Link, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const APP_ROUTES = [
  {
    icon: <Package className="h-4 w-4" />,
    to: "/products",
    tooltip: "Produtos",
  },
  {
    icon: <Package className="h-4 w-4" />,
    to: "/teste",
  },
];

export function SystemSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <div className="border-b">
        <Link to="/" className="flex items-center justify-center h-14">
          <GithubIcon className="w-6 h-6" />
        </Link>
      </div>

      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        {APP_ROUTES.map(({ icon, to, tooltip }, index) => {
          if (!tooltip) {
            return (
              <Link key={index} to={to}>
                <Button
                  variant={pathname === to ? "default" : "outline"}
                  size="icon"
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
                >
                  {icon}
                </Button>
              </Link>
            );
          }

          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Link to={to}>
                  <Button
                    variant={pathname === to ? "default" : "outline"}
                    size="icon"
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
                  >
                    {icon}
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{tooltip}</TooltipContent>
            </Tooltip>
          );
        })}
      </nav>
    </aside>
  );
}
