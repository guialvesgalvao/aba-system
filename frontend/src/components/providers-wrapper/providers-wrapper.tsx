import { queryClient } from "@/shared/helpers/use-query-helper";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "../ui/tooltip";

interface IProvidersWrapperProps {
  children: React.ReactNode;
}

export function ProvidersWrapper(props: Readonly<IProvidersWrapperProps>) {
  const { children } = props;

  return (
    <TooltipProvider delayDuration={0}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </TooltipProvider>
  );
}
