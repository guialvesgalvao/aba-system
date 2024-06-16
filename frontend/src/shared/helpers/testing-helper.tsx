import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./use-query-helper";

/**
 * Wait for a given amount of time before resolving the promise.
 * @param ms Amount of time to wait in milliseconds.
 * @param value Value to be resolved.
 * @returns {Promise<T>} Promise that resolves the value after the given time.
 */
export async function wait<T>(ms: number, value: T): Promise<T> {
  return new Promise<T>((resolve) => setTimeout(resolve, ms, value));
}

interface ICreateQueryProviderWrapperProps {
  children: React.ReactNode;
}
export function CreateQueryProviderWrapper(
  props: ICreateQueryProviderWrapperProps
) {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
