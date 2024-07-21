import { queryClient } from "../use-query-helper";

export async function fetchAppQuery<TResponse>(
  queryKey: string[]
): Promise<TResponse> {
  try {
    const response = (await queryClient.fetchQuery({ queryKey })) as TResponse;

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Erro ao buscar dados da aplicação na API.");
  }
}
