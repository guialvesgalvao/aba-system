import { ToolbarThemeButton } from "../theme-button/theme-button";
import { ToolbarCollapseButton } from "../collapse-button/collapse-button";

export function ToolbarContent() {
  return (
    <div className="w-full h-full flex items-center justify-center text-white gap-2">
      <div className="flex gap-1">
        <ToolbarThemeButton />
        <ToolbarCollapseButton />
      </div>
    </div>
  );
}
