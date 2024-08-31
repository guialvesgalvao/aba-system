import { useSidebar } from "@/shared/hooks/use-sidebar";
import { ArrowRightIcon, ArrowLeftIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import { ToggleGroupItem } from "../ui/toggle-group";

export function ToolbarCollapseButton() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  const icon = isCollapsed ? (
    <ArrowRightIcon className="w-4 h-4" />
  ) : (
    <ArrowLeftIcon className="w-4 h-4" />
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ToggleGroupItem value="collapse" onClick={() => toggleSidebar()}>
          {icon}
        </ToggleGroupItem>
      </TooltipTrigger>
      <TooltipContent side="top">
        {isCollapsed ? "Expandir" : "Colapsar"}
      </TooltipContent>
    </Tooltip>
  );
}
