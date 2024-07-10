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
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormRequest } from "@/components/form-request/form-request";
import { ProductsForm } from "@/components/products/products-form/products-form";
import { Button } from "@/components/ui/button";
import { RefreshCcw, CirclePlus } from "lucide-react";

const TABS: TabValue[] = [
  { text: "Todos", value: TabsStatusEnum.All },
  { text: "Ativos", value: TabsStatusEnum.Active },
  { text: "Rascunhos", value: TabsStatusEnum.Draft },
  { text: "Arquivados", value: TabsStatusEnum.Archived },
];

export function ProductsDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = getDefaultTab();
  const currentTab = searchParams.get("status") as TabsStatusEnum;

  const { getProducts, getProductById } = new ProductsService();

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
        <Dialog>
          <div className="flex justify-between">
            <DashboardTabs tabs={TABS} />

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCcw size={18} />
                Atualizar
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <CirclePlus size={18} />
                    Criar novo produto
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-[1000px]">
                  <DialogTitle>Criar Produto</DialogTitle>
                  <ProductsForm
                    item={undefined}
                    isLoading={false}
                    isFetching={false}
                    isError={false}
                    error={null}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
                Todos os Produtos
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Lista de todos os produtos cadastrados no sistema
              </CardDescription>
            </CardHeader>

            <CardContent className="h-full">
              <div className="h-full">
                <ComponentRequest<Product>
                  storages={["products", currentTab]}
                  request={getProducts}
                  component={ProductsTable}
                />
              </div>

              <DialogContent className="max-w-[1000px]">
                <DialogTitle>Editar Produto</DialogTitle>
                <FormRequest
                  component={ProductsForm}
                  form="products"
                  request={getProductById}
                />
              </DialogContent>
            </CardContent>
          </Card>
        </Dialog>
      </Tabs>
    </div>
  );
}
