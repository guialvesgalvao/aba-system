import { ToolbarThemeButton } from "../theme-button/toolbar-theme-button";
import { ToolbarCollapseButton } from "../collapse-button/toolbar-collapse-button";
import { ToggleGroup } from "../ui/toggle-group";
import { Separator } from "../ui/separator";
import { X } from "lucide-react";
import { useToolbar } from "@/shared/hooks/use-toolbar";
import { ToolbarButtonVariant } from "./toolbar-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function ToolbarContent() {
  return (
    <div className="flex items-center gap-1 text-white">
      <CloseToolbarButton />

      <Separator className="bg-primary h-4 mx-1" orientation="vertical" />

      <ToggleGroup size="sm" variant="default" type="multiple">
        <ToolbarCollapseButton />
        <ToolbarThemeButton />
      </ToggleGroup>
    </div>
  );
}

function CloseToolbarButton() {
  const { toggleToolbar } = useToolbar();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ToolbarButtonVariant onClick={() => toggleToolbar(true)}>
          <X className="w-4 h-4" />
        </ToolbarButtonVariant>
      </TooltipTrigger>
      <TooltipContent>Fechar</TooltipContent>
    </Tooltip>
  );
}
