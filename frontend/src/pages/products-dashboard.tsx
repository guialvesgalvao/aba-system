import { ProductsTable } from "@/components/products/products-table/products-table";

import ProductsService from "@/shared/services/products-service";

import { Product } from "@/shared/factories/products-factory";
import { StatusTabsChooser } from "@/components/status-tabs-chooser/status-tabs-chooser";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ProductsForm } from "@/components/products/products-form/products-form";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

import { fetchAppQuery } from "@/shared/helpers/query-helper/query-helper";
import { RefreshButton } from "@/components/utilities/refresh-button";
import { TabRenderBasedStatus } from "@/components/tab-render-based-status/tab-render-based-status";
import { CardData } from "@/components/card-data/card-data";
import { useStatusParam } from "@/shared/hooks/use-status-param";
import { TitlePage } from "@/components/title-page/title-page";
import { useState } from "react";

import { IComponentRequestProps } from "@/components/component-request/component-request";
import { ProductStatus } from "@/shared/types/products-types";

export function ProductsDashboard() {
  const { getCurrentStatus } = useStatusParam();
  const { getAllProducts, getProductsByStatus } = new ProductsService();

  const [isFormOpen, setIsFormOpen] = useState(false);

  console.log("ProductsDashboard", isFormOpen);

  async function refreshPage() {
    const status = getCurrentStatus();
    await fetchAppQuery<Product[]>(["products", status]);
  }

  function generateTable(
    status?: ProductStatus
  ): IComponentRequestProps<Product> {
    if (!status) {
      return {
        storages: ["products", "all"],
        request: getAllProducts,
        component: ProductsTable,
      };
    }

    return {
      storages: ["products", status],
      request: () => getProductsByStatus(status),
      component: ProductsTable,
    };
  }

  return (
    <Dialog>
      <header className="flex justify-between flex-wrap gap-2">
        <TitlePage title="Produtos" subtitle="Gerencie seus produtos" />

        <div className="flex items-center gap-2">
          <RefreshButton text="Atualizar página" onClick={refreshPage} />

          <ProductsForm
            trigger={
              <DialogTrigger asChild>
                <Button type="button" size="sm" className="gap-2">
                  <CirclePlus size={18} />
                  Criar novo
                </Button>
              </DialogTrigger>
            }
            formKeys={["products"]}
            item={undefined}
            isLoading={false}
            isFetching={false}
          />
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-2 md:gap-4">
        <StatusTabsChooser />

        <TabRenderBasedStatus
          tabs={{
            all: (
              <CardData<Product>
                title="Todos os Produtos"
                description="Lista com todos os produtos cadastrados no sistema"
                table={generateTable()}
              />
            ),
            enabled: (
              <CardData<Product>
                title="Produtos Ativos"
                description="Lista de produtos ativos no sistema"
                table={generateTable("enabled")}
              />
            ),
            archived: (
              <CardData<Product>
                title="Produtos Arquivados"
                description="Lista de produtos arquivados no sistema"
                table={generateTable("archived")}
              />
            ),
            draft: (
              <CardData<Product>
                title="Produtos em Rascunho"
                description="Lista de produtos em rascunho no sistema"
                table={generateTable("draft")}
              />
            ),
          }}
        />
      </main>
    </Dialog>
  );
}
