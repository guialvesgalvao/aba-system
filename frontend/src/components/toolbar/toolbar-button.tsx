import React from "react";

import { VariantProps } from "class-variance-authority";
import { ButtonProps, buttonVariants } from "../ui/button";

export interface IToolbarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const ToolbarButtonVariant = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const { children } = props;

  return (
    <button
      ref={ref}
      className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10"
      {...props}
    >
      {children}
    </button>
  );
});
