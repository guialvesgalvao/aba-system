import { RefreshButton } from "@/components/utilities/refresh-button";
import { Order } from "@/shared/factories/orders-factory";
import { useStatusParam } from "@/shared/hooks/use-status-param";

import { fetchAppQuery } from "@/shared/helpers/query-helper/query-helper";
import { TitlePage } from "@/components/title-page/title-page";

export function OrdersDashboard() {
  const { getCurrentStatus } = useStatusParam();

  async function refreshPage() {
    const status = getCurrentStatus();
    await fetchAppQuery<Order[]>(["orders", status]);
  }

  return (
    <>
      <header className="flex flex-wrap md:flex-nowrap justify-between items-center gap-2">
        <TitlePage title="Pedidos" subtitle="Acompanhe os pedidos realizados" />

        <div className="flex flex-wrap md:flex-nowrap gap-2">
          <RefreshButton
            variant="outline"
            text="Atualizar página"
            onClick={refreshPage}
          />
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 md:gap-8">Teste</main>
    </>
  );
}
