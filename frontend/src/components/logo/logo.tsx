import { Link } from "react-router-dom";
import { Package2 } from "lucide-react";
import { useSidebar } from "@/shared/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ILogoProps {
  to: string;
}

export function Logo(props: Readonly<ILogoProps>) {
  const { to } = props;
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={cn(
        "flex md:h-14 items-center border-b-0 border-r md:border-b md:border-r-0 px-4 lg:h-[60px] lg:px-6 transition-colors",
        isCollapsed ? "justify-center" : "lg:justify-center"
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={to} className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            {!isCollapsed && <span className="hidden md:flex">Aba System</span>}
          </Link>
        </TooltipTrigger>
        <TooltipContent className="hidden md:flex" side="right">
          Navegar para a página inicial
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
