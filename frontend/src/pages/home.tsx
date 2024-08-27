import { TileElement } from "@/components/tiles/tile";
import { Tiles } from "@/components/tiles/tiles";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ArrowUpRight, DollarSign, Package, RefreshCcwDot, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChartRender } from "@/components/charts/bar-chart-render";
import { OrdersStaticTable } from "@/components/orders/orders-static-table/orders-static-table";
import { ComponentRequest } from "@/components/component-request/component-request";
import { SignatureText } from "@/components/signature-text/signature-text";
import { RefreshButton } from "@/components/utilities/refresh-button";

import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TitlePage } from "@/components/title-page/title-page";
import { Order } from "@/shared/factories/orders-factory";
import { fetchAppQuery } from "@/shared/helpers/query-helper/query-helper";
import { createOrdersMockBasedOnLength } from "@/shared/mocks/orders-mocks";

export function Home() {
  const tiles: TileElement[] = [
    {
      title: "Valor Total Vendido",
      icon: <DollarSign className="w-6 h-6 text-gray-400" />,
      value: "R$ 1000,00",
      percentage: "10%",
      description: "vendido na última semana",
    },
    {
      title: "Total Pedidos",
      icon: <Package className="w-6 h-6 text-gray-400" />,
      value: "Value 1",
      percentage: "10%",
      description: "Description 1",
    },
    {
      title: "Pedidos Pendentes",
      icon: <Package className="w-6 h-6 text-gray-400" />,
      value: "Value 3",
      percentage: "30%",
      description: "Description 3",
    },
  ];

  return (
    <>
      <header className="flex flex-wrap md:flex-nowrap justify-between items-center gap-2">
        <TitlePage
          title="Página Inicial"
          subtitle="Analise e Gerencie os pedidos do Aba"
        />

        <div className="flex flex-wrap md:flex-nowrap gap-2">
          <RefreshButton
            variant="default"
            text="Atualizar"
            onClick={async () => {}}
          />
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 transition-all">
          <div className="rounded-xl border border-slate-200 text-slate-950 shadow dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50">
            <Button
              type="button"
              className="min-h rounded-xl w-full h-full items-center justify-center gap-2"
            >
              <div className="flex items-center justify-center">
                <Plus className="w-10 h-10" />
              </div>
              <div className="flex flex-col items-start">
                <h5 className="text-base font-semibold">Criar pedido</h5>
                <p className="text-sm">Crie um novo pedido</p>
              </div>
            </Button>
          </div>
          <Tiles tiles={tiles} />
        </div>

        <div className="h-full grid pb-6 gap-4 md:gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
              <div className="grid gap-2">
                <CardTitle>Últimos Pedidos</CardTitle>
                <CardDescription>
                  Os últimos 10 pedidos feitos no{" "}
                  <SignatureText>Aba.</SignatureText>
                </CardDescription>
              </div>

              <div className="flex gap-2">
                <ButtonRefreshLastOrders />
                <ButtonRedirectOrders />
              </div>
            </CardHeader>

            <CardContent className="h-[576px] overflow-auto mr-6">
              <ComponentRequest<Order>
                storages={["orders", "last"]}
                component={OrdersStaticTable}
                request={() => createOrdersMockBasedOnLength(100)}
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            <BarChartRender />
            <BarChartRender />
          </div>
        </div>
      </main>
    </>
  );
}

function ButtonRefreshLastOrders() {
  async function refreshLastOrders() {
    await fetchAppQuery<Order[]>(["orders", "last"]);
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant="outline"
          type="button"
          size="sm"
          className="gap-1"
          onClick={refreshLastOrders}
        >
          Atualizar Pedidos
          <RefreshCcwDot className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Clique aqui para atualizar lista de pedidos
      </TooltipContent>
    </Tooltip>
  );
}

function ButtonRedirectOrders() {
  const navigate = useNavigate();

  function navigateToOrdersDashboard() {
    navigate("/orders");
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant="outline"
          type="button"
          size="sm"
          className="gap-1"
          onClick={navigateToOrdersDashboard}
        >
          Ver pedidos
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Clique aqui para acessar os pedidos</TooltipContent>
    </Tooltip>
  );
}
