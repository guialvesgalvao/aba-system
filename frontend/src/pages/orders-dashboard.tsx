import { OrdersTable } from "@/components/orders/orders-table/orders-table";

import OrdersService from "@/shared/services/orders-service";

import { Order } from "@/shared/factories/orders-factory";
import { StatusTabsChooser } from "@/components/status-tabs-chooser/status-tabs-chooser";
import {
  Dialog
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useStatusParam } from "@/shared/hooks/use-status-param";
import { RefreshButton } from "@/components/utilities/refresh-button";
import { fetchAppQuery } from "@/shared/helpers/query-helper/query-helper";
import { CardData } from "@/components/card-data/card-data";
import { TabRenderBasedStatus } from "@/components/tab-render-based-status/tab-render-based-status";
import { Link } from "react-router-dom";

export function OrdersDashboard() {
  const { getCurrentStatus } = useStatusParam();
  const { getAllOrders, getOrdersByStatus } = new OrdersService();

  async function refreshPage() {
    const status = getCurrentStatus();
    await fetchAppQuery<Order[]>(["orders", status]);
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 py-4 px-6">
      <div className="w-full h-full flex flex-col gap-4">
        <Dialog>
          <div className="flex justify-between flex-wrap gap-2">
            <StatusTabsChooser />

            <div className="flex items-center gap-2">
              <RefreshButton text="Atualizar página" onClick={refreshPage} />
              
                  <Button type="button" size="sm" className="gap-2">
                    <Link to="/google">
                      <CirclePlus size={18} />
                      Criar novo pedido
                    </Link>
                  </Button>
            </div>
          </div>

          <TabRenderBasedStatus
            tabs={{
              all: (
                <CardData<Order>
                  title="Todos os pedidos"
                  description="Lista de todos os pedidos do sistema"
                  table={{
                    storage: ["orders", "all"],
                    request: getAllOrders,
                    component: OrdersTable,
                  }}
                  form={null}
                />
              ),
              enabled: (
                <CardData<Order>
                  title="Pedidos Ativos"
                  description="Lista de pedidos ativos no sistema"
                  table={{
                    storage: ["orders", "enabled"],
                    request: () => getOrdersByStatus("enabled"),
                    component: OrdersTable,
                  }}
                  form={null}
                />
              ),
              archived: (
                <CardData<Order>
                  title="Pedidos Arquivados"
                  description="Lista de pedidos arquivados no sistema"
                  table={{
                    storage: ["orders", "archived"],
                    request: () => getOrdersByStatus("archived"),
                    component: OrdersTable,
                  }}
                  form={null}
                />
              ),
              draft: (
                <CardData<Order>
                  title="Pedidos em Rascunho"
                  description="Lista de pedidos em rascunho no sistema"
                  table={{
                    storage: ["orders", "draft"],
                    request: () => getOrdersByStatus("draft"),
                    component: OrdersTable,
                  }}
                  form={null}
                />
              ),
            }}
          />
        </Dialog>
      </div>
    </div>
  );
}
