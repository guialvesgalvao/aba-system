import { MoreHorizontal, X } from "lucide-react";
import React from "react";
import { Separator } from "../ui/separator";
import { ToolbarThemeButton } from "../theme-button/theme-button";
import { ToolbarCollapseButton } from "../collapse-button/collapse-button";
import { VariantProps } from "class-variance-authority";
import { ButtonProps, buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import { useToolbar } from "@/shared/hooks/use-toolbar";

export function Toolbar() {
  const { isCollapsed, toggleToolbar } = useToolbar();

  const icon = !isCollapsed ? (
    <MoreHorizontal className="w-5 h-5" />
  ) : (
    <X className="w-5 h-5" />
  );

  return (
    <div className="bg-toolbar h-10 fixed bottom-[4%] rounded-full -translate-x-2/4 -translate-y-2/4 left-2/4 z-50 border shadow p-2">
      <div className="w-full h-full flex items-center justify-center text-white gap-2">
        {isCollapsed && (
          <>
            <div className="flex gap-1">
              <ToolbarThemeButton />
              <ToolbarCollapseButton />
            </div>

            <Separator orientation="vertical" />
          </>
        )}

        <Tooltip>
          <TooltipTrigger>
            <ToolbarButtonVariant onClick={() => toggleToolbar()}>
              {icon}
            </ToolbarButtonVariant>
          </TooltipTrigger>
          <TooltipContent>{isCollapsed ? "Fechar" : "Abrir"}</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

export interface IToolbarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const ToolbarButtonVariant = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10"
      {...props}
    >
      {props.children}
    </button>
  );
});
