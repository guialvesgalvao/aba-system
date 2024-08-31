import { useTheme } from "@/shared/hooks/use-theme";
import { Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import { ToggleGroupItem } from "../ui/toggle-group";

export function ToolbarThemeButton() {
  const { theme, setTheme } = useTheme();

  const icon =
    theme === "light" ? (
      <Sun className="w-4 h-4" />
    ) : (
      <Moon className="w-4 h-4" />
    );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ToggleGroupItem
          value="theme"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {icon}
        </ToggleGroupItem>
      </TooltipTrigger>
      <TooltipContent>
        {theme === "light" ? "Mudar para tema escuro" : "Mudar para tema claro"}
      </TooltipContent>
    </Tooltip>
  );
}
