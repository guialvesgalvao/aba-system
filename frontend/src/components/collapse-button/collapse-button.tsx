import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import { useSidebar } from "@/shared/hooks/use-sidebar";

export function CollapseButton() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  const icon = isCollapsed ? (
    <ArrowRightIcon className="w-4 h-4" />
  ) : (
    <ArrowLeftIcon className="w-4 h-4" />
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="w-6 h-6 text-muted-foreground transition-all hover:text-primary"
          onClick={() => toggleSidebar()}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        {isCollapsed ? "Expandir" : "Colapsar"}
      </TooltipContent>
    </Tooltip>
  );
}
