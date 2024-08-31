import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Link } from "react-router-dom";
import { INavButtonProps } from "./nav-button";
import { createElement } from "react";

interface INavCollapsedButtonProps extends INavButtonProps {
  isPathSelect: boolean;
}

export function NavCollapsedButton(props: Readonly<INavCollapsedButtonProps>) {
  const { icon, to, tooltip, isPathSelect } = props;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="md:w-full flex items-center justify-center">
          <Link to={to}>
            <Button
              type="button"
              variant={isPathSelect ? "default" : "ghost"}
              className={cn(
                "w-10 h-10 flex items-center justify-start gap-3 rounded-md px-3 py-2",
                !isPathSelect &&
                  "text-muted-foreground transition-colors hover:text-primary"
              )}
              size="icon"
            >
              {createElement(icon, { className: "h-4 w-4" })}
            </Button>
          </Link>
        </div>
      </TooltipTrigger>
      <TooltipContent className="hidden md:flex" side="right">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}
