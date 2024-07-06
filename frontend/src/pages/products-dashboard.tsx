import { ComponentRequest } from "@/components/component-request/component-request";
import { ProductsTable } from "@/components/products/products-table/products-table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { TabsStatusEnum } from "@/shared/enums/data";

import ProductsService from "@/shared/services/products-service";

import { TabsContent } from "@radix-ui/react-tabs";
import { useSearchParams } from "react-router-dom";
import { Product } from "@/shared/factories/products-factory";
import { createProductsMockBasedOnLength } from "@/shared/mocks/products-mocks";
import {
  DashboardTabs,
  TabValue,
} from "@/components/dashboard-tabs/dashboard-tabs";

const TABS: TabValue[] = [
  { text: "Todos", value: TabsStatusEnum.All },
  { text: "Ativos", value: TabsStatusEnum.Active },
  { text: "Rascunhos", value: TabsStatusEnum.Draft },
  { text: "Arquivados", value: TabsStatusEnum.Archived },
];

export function ProductsDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = getDefaultTab();

  const { getProducts } = new ProductsService();

  function getDefaultTab(): TabsStatusEnum {
    return (searchParams.get("status") as TabsStatusEnum) || TabsStatusEnum.All;
  }

  function handleTabChange(value: string) {
    addOrRemoveStatusFromSearchParam(value as TabsStatusEnum);
  }

  function addOrRemoveStatusFromSearchParam(value: TabsStatusEnum) {
    const searchStatusParam = searchParams.has("status");

    if (searchStatusParam && value === TabsStatusEnum.All) {
      searchParams.delete("status");
    } else {
      searchParams.set("status", value);
    }

    setSearchParams(searchParams);
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 py-4 px-6">
      <Tabs
        onValueChange={handleTabChange}
        className="w-full h-full flex flex-col gap-4"
        defaultValue={defaultTab}
      >
        <DashboardTabs tabs={TABS} />

        <Card className="h-full overflow-hidden">
          <TabsContent className="h-full" value="all">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
                Todos os Produtos
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Lista de todos os produtos cadastrados no sistema
              </CardDescription>
            </CardHeader>

            <CardContent className="h-full overflow-y-auto">
              <ComponentRequest<Product>
                storages={["products", "all"]}
                request={() => createProductsMockBasedOnLength(10)}
                component={ProductsTable}
              />
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
