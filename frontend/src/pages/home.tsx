import { TileElement } from "@/components/tiles/tile";
import { Tiles } from "@/components/tiles/tiles";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ArrowUpRight, DollarSign, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChartRender } from "@/components/charts/bar-chart-render";

function Home() {
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
    {
      title: "Pedidos Cancelados",
      icon: <Package className="w-6 h-6 text-gray-400" />,
      value: "Value 4",
      percentage: "40%",
      description: "Description 4",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col px-6 md:px-8">
      <div className="h-20 flex flex-col justify-center">
        <h1 className="text-lg font-medium">Aba System</h1>
        <h4 className="text-gray-600 font-normal">
          Página inicial do sistema do Aba
        </h4>
      </div>

      <main className="flex flex-1 flex-col gap-4 md:gap-8">
        <Tiles tiles={tiles} />

        <div className="h-full grid pb-6 gap-4 md:gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Últimos Pedidos</CardTitle>
                <CardDescription>
                  Os últimos pedidos feitos na sua loja.
                </CardDescription>
              </div>
              <Button size="sm" className="ml-auto gap-1">
                Ver pedidos
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent></CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BarChartRender />
            <BarChartRender />
            <BarChartRender />
            <BarChartRender />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
