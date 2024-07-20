import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ISubComponentButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isExpanded: boolean;
  strings?: {
    tooltipFold?: string;
    tooltipExpand?: string;
  };
}

export function SubComponentButton(props: Readonly<ISubComponentButtonProps>) {
  const {
    children,
    onClick,
    isExpanded,
    strings = {
      tooltipFold: "Recolher informações da linha",
      tooltipExpand: "Expandir informações da linha",
    },
  } = props;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={400} disableHoverableContent>
        <TooltipTrigger>
          <Button
            aria-expanded={isExpanded?.valueOf()}
            variant="ghost"
            size="icon"
            onClick={onClick}
            className={cn(
              "w-6 h-6",
              isExpanded
                ? "opacity-100 hover:opacity-100"
                : "opacity-50 hover:opacity-80"
            )}
            asChild
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-80">
          {isExpanded ? strings.tooltipFold : strings.tooltipExpand}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
