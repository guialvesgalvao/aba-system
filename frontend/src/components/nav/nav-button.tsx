import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useSidebar } from "@/shared/hooks/use-sidebar";

interface INavButtonProps {
  currentPath: string;
  icon: JSX.Element;
  to: string;
  text: string;
  tooltip?: string;
}

export function NavButton(props: INavButtonProps) {
  const { currentPath, text, icon, to, tooltip } = props;

  const { isCollapsed } = useSidebar();

  // Se o menu estiver colapsado, não exibe o texto do botão
  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-full flex items-center justify-center">
            <Link to={to}>
              <Button
                variant={currentPath === to ? "default" : "outline"}
                size="icon"
                className="w-10 h-10 rounded-md"
              >
                {icon}
              </Button>
            </Link>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">{tooltip}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link className="w-full" to={to}>
          <Button
            variant={currentPath === to ? "default" : "outline"}
            className="w-full h-10 flex items-center justify-start gap-2 rounded-md"
          >
            {icon} <span>{text}</span>
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{tooltip}</TooltipContent>
    </Tooltip>
  );
}
