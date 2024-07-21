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

export function ProductsDashboard() {
  const { getCurrentStatus } = useStatusParam();
  const { getAllProducts, getProductsByStatus, getProductById } =
    new ProductsService();

  async function refreshPage() {
    const status = getCurrentStatus();
    await fetchAppQuery<Product[]>(["products", status]);
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 py-4 px-6">
      <Dialog>
        <div className="flex justify-between flex-wrap gap-2">
          <StatusTabsChooser />

          <div className="flex items-center gap-2">
            <RefreshButton text="Atualizar página" onClick={refreshPage} />

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

        <TabRenderBasedStatus
          tabs={{
            all: (
              <CardData<Product>
                title="Todos os Produtos"
                description="Lista com todos os produtos cadastrados no sistema"
                table={{
                  storage: ["products", "all"],
                  request: getAllProducts,
                  component: ProductsTable,
                }}
                form={{
                  name: "products",
                  request: getProductById,
                  component: ProductsForm,
                }}
              />
            ),
            enabled: (
              <CardData<Product>
                title="Produtos Ativos"
                description="Lista de produtos ativos no sistema"
                table={{
                  storage: ["products", "enabled"],
                  request: () => getProductsByStatus("enabled"),
                  component: ProductsTable,
                }}
                form={{
                  name: "products",
                  request: getProductById,
                  component: ProductsForm,
                }}
              />
            ),
            archived: (
              <CardData<Product>
                title="Produtos Arquivados"
                description="Lista de produtos arquivados no sistema"
                table={{
                  storage: ["products", "archived"],
                  request: () => getProductsByStatus("archived"),
                  component: ProductsTable,
                }}
                form={{
                  name: "products",
                  request: getProductById,
                  component: ProductsForm,
                }}
              />
            ),
            draft: (
              <CardData<Product>
                title="Produtos em Rascunho"
                description="Lista de produtos em rascunho no sistema"
                table={{
                  storage: ["products", "draft"],
                  request: () => getProductsByStatus("draft"),
                  component: ProductsTable,
                }}
                form={{
                  name: "products",
                  request: getProductById,
                  component: ProductsForm,
                }}
              />
            ),
          }}
        />
      </Dialog>
    </div>
  );
}
