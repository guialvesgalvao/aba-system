import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import { useSidebar } from "@/shared/hooks/use-sidebar";

export function CollapseButton() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="w-6 h-6"
          onClick={toggleSidebar}
        >
          {isCollapsed ? (
            <ArrowRightIcon className="w-4 h-4" />
          ) : (
            <ArrowLeftIcon className="w-4 h-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        {isCollapsed ? "Expandir" : "Colapsar"}
      </TooltipContent>
    </Tooltip>
  );
}
