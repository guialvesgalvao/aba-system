import { cn } from "@/lib/utils";
import { useSidebar } from "@/shared/hooks/use-sidebar";

interface IAppCollapsedWrapperProps {
  children: React.ReactNode;
}

export function AppCollapsedWrapper(
  props: Readonly<IAppCollapsedWrapperProps>
) {
  const { children } = props;

  const { isCollapsed } = useSidebar();

  return (
    <div
      className={cn(
        "flex flex-col w-full h-full pt-20 md:pt-0",
        isCollapsed ? "md:pl-20" : "md:pl-52"
      )}
    >
      {children}
    </div>
  );
}
