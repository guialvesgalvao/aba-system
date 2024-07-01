import { ProductsForm } from "@/components/products/products-form/products-form";
import { ComponentRequest } from "@/components/component-request/component-request";
import { ProductsTable } from "@/components/products/products-table/products-table";
import { SystemTray } from "@/components/system-tray/system-tray";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { TabsStatusEnum } from "@/shared/enums/data";

import ProductsService from "@/shared/services/products-service";

import { TabsContent } from "@radix-ui/react-tabs";
import { CirclePlus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Product } from "@/shared/factories/products-factory";

export function ProductsDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = getDefaultTab();

  const { getProducts } = new ProductsService();

  function getDefaultTab(): TabsStatusEnum {
    return (searchParams.get("status") as TabsStatusEnum) || TabsStatusEnum.All;
  }

  function handleTabChange(value: string) {
    controlTabSearchParam(value as TabsStatusEnum);
  }

  function controlTabSearchParam(value: TabsStatusEnum) {
    const hasSearchParam = searchParams.has("status");

    if (hasSearchParam && value === TabsStatusEnum.All) {
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
        <div className="w-full flex justify-between">
          <TabsList defaultValue="all">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Ativos</TabsTrigger>
            <TabsTrigger value="draft">Rascunhos</TabsTrigger>
            <TabsTrigger value="archived">Arquivados</TabsTrigger>
          </TabsList>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <CirclePlus size={18} />
                Criar novo produto
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[1000px]">
              <ProductsForm />
            </DialogContent>
          </Dialog>
        </div>

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
                request={getProducts}
                component={ProductsTable}
              />
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
