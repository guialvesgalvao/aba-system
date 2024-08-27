import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useSidebar } from "@/shared/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { NavCollapsedButton } from "./nav-collapsed-button";
import { createElement } from "react";

export interface INavButtonProps {
  currentPath: string;
  icon: React.ComponentType<{ className?: string }>;
  to: string;
  text: string;
  tooltip?: string;
}

export function NavButton(props: Readonly<INavButtonProps>) {
  const { currentPath, text, icon, to, tooltip } = props;

  const { isCollapsed } = useSidebar();

  const isPathSelect = currentPath === to;

  // Se o menu estiver colapsado, não exibe o texto do botão
  if (isCollapsed) {
    return <NavCollapsedButton {...props} isPathSelect={isPathSelect} />;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link className="h-10 md:w-full" to={to}>
          <Button
            type="button"
            variant={isPathSelect ? "default" : "ghost"}
            className={cn(
              "md:w-full h-10 flex items-center justify-start gap-3 rounded-md px-3 py-2 transition-all",
              !isPathSelect && "text-muted-foreground hover:text-primary"
            )}
          >
            {createElement(icon, { className: "h-4 w-4" })}
            <span className="hidden md:flex">{text}</span>
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent className="hidden md:flex" side="right">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}
