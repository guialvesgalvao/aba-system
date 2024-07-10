import { cn } from "@/lib/utils";
import { useSidebar } from "@/shared/hooks/use-sidebar";

interface IAppCollapsedWrapperProps {
  children: React.ReactNode;
}

export function AppCollapsedWrapper(props: IAppCollapsedWrapperProps) {
  const { children } = props;

  const { isCollapsed } = useSidebar();

  return (
    <div
      className={cn(
        "flex flex-col w-full h-full",
        isCollapsed ? "pl-20" : "pl-52"
      )}
    >
      {children}
    </div>
  );
}
