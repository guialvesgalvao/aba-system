import { useToolbar } from "@/shared/hooks/use-toolbar";
import { ToolbarContent } from "./toolbar-content";
import { PanelLeftOpen } from "lucide-react";
import { ToolbarButtonVariant } from "./toolbar-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function ToolbarMenu() {
  const { isCollapsed } = useToolbar();

  return (
    <div
      id="toolbar-menu"
      className="bg-toolbar h-9 flex items-center justify-center fixed md:absolute bottom-[4%] border-t border-r border-b left-0 md:left-full z-50 px-1 pr-2 rounded-r-lg"
    >
      {isCollapsed ? <OpenToolbarButton /> : <ToolbarContent />}
    </div>
  );
}

function OpenToolbarButton() {
  const { toggleToolbar } = useToolbar();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ToolbarButtonVariant
          className="text-white"
          onClick={() => toggleToolbar()}
        >
          <PanelLeftOpen className="w-4 h-4" />
        </ToolbarButtonVariant>
      </TooltipTrigger>
      <TooltipContent>Abrir ferramentas</TooltipContent>
    </Tooltip>
  );
}
