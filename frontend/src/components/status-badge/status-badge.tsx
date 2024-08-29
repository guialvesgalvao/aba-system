import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface IStatusBadgeProps {
  text: string;
  description: string;
  className?: string;
}

export function StatusBadge(props: Readonly<IStatusBadgeProps>) {
  const { text, description, className } = props;

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge>{text}</Badge>
      </TooltipTrigger>
      <TooltipContent>{description}</TooltipContent>
    </Tooltip>
  );
}
