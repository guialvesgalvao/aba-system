import { OrdersTable } from "@/components/orders/orders-table/orders-table";

import OrdersService from "@/shared/services/orders-service";

import { Order } from "@/shared/factories/orders-factory";

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useStatusParam } from "@/shared/hooks/use-status-param";
import { RefreshButton } from "@/components/utilities/refresh-button";
import { fetchAppQuery } from "@/shared/helpers/query-helper/query-helper";
import { CardData } from "@/components/card-data/card-data";
import { TabRenderBasedStatus } from "@/components/tab-render-based-status/tab-render-based-status";
import { Link } from "react-router-dom";
import { TitlePage } from "@/components/title-page/title-page";
import { StatusTabsChooser } from "@/components/status-tabs-chooser/status-tabs-chooser";
import { Dialog } from "@/components/ui/dialog";
import { OrderStatus } from "@/shared/types/orders-types";
import { IComponentRequestProps } from "@/components/component-request/component-request";

export function OrdersDashboard() {
  const { getCurrentStatus } = useStatusParam();
  const { getAllOrders, getOrdersByStatus } = new OrdersService();

  async function refreshPage() {
    const status = getCurrentStatus();
    await fetchAppQuery<Order[]>(["orders", status]);
  }

  
  function generateTable(
    status?: OrderStatus
  ): IComponentRequestProps<Order> {
    if (!status) {
      return {
        storages: ["orders", "all"],
        request: getAllOrders,
        component: OrdersTable,
      };
    }

    return {
      storages: ["orders", status],
      request: () => getOrdersByStatus(status),
      component: OrdersTable,
    };
  }

  return (
    <Dialog>
      <header className="flex justify-between flex-wrap gap-2">
        <TitlePage title="Pedidos" subtitle="Gerencie seus pedidos" />

        <div className="flex items-center gap-2">
          <RefreshButton text="Atualizar página" onClick={refreshPage} />

          <Link to={"google"}>
            <Button type="button" size="sm" className="gap-2">
              <CirclePlus size={18} />
              Criar novo pedido
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-2 md:gap-4">
        <StatusTabsChooser />
        <TabRenderBasedStatus
          tabs={{
            all: (
              <CardData<Order>
                title="Todos os pedidos"
                description="Lista de todos os pedidos do sistema"
                table={generateTable()}
              />
            ),
            enabled: (
              <CardData<Order>
                title="Pedidos Ativos"
                description="Lista de pedidos ativos no sistema"
                table={generateTable('in_progress')}
              />
            ),
            archived: (
              <CardData<Order>
                title="Pedidos Arquivados"
                description="Lista de pedidos cancelados no sistema"
                table={generateTable('canceled')}
              />
            ),
            closed: (
              <CardData<Order>
                title="Pedidos Encerrados"
                description="Lista de pedidos encerrados no sistema"
                table={generateTable('closed')}
              />
            ),
            draft: (
              <CardData<Order>
                title="Pedidos em Rascunho"
                description="Lista de pedidos em rascunho no sistema"
                table={generateTable('draft')}
              />
            ),
          }}
        />
      </main>
    </Dialog>
  );
}
