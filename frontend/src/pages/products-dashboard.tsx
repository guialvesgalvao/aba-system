import { ProductsFormCreate } from "@/components/products/products-form-create";
import { ProductsRequest } from "@/components/products/products-request/products-request";
import { ProductsTable } from "@/components/products/products-table";
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
import {
  getActiveProducts,
  getAllProducts,
  getArchivedProducts,
  getDraftProducts,
} from "@/shared/services/products-service";

import { TabsContent } from "@radix-ui/react-tabs";
import { CirclePlus } from "lucide-react";

interface IProductsDashboardProps {
  defaultTab?: "all" | "active" | "draft" | "archived";
}

export function ProductsDashboard(props: IProductsDashboardProps) {
  const { defaultTab = "all" } = props;

  return (
    <div className="w-full h-full flex flex-col gap-4 py-4 px-6">
      <SystemTray />

      <Tabs
        onValueChange={(value) => console.log(value)}
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
            <DialogContent className="max-w-[900px]">
              <ProductsFormCreate />
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
              <ProductsRequest
                storages={["products", "all"]}
                request={getAllProducts}
                component={ProductsTable}
              />
            </CardContent>
          </TabsContent>

          <TabsContent className="h-full" value="active">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
                Produtos ativos
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Lista de todos produtos ativos no sistema
              </CardDescription>
            </CardHeader>

            <CardContent className="h-full overflow-y-auto">
              <ProductsRequest
                storages={["products", "active"]}
                request={getActiveProducts}
                component={ProductsTable}
              />
            </CardContent>
          </TabsContent>

          <TabsContent className="h-full" value="draft">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
                Produtos em rascunho
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Lista de todos produtos em rascunho no sistema
              </CardDescription>
            </CardHeader>

            <CardContent className="h-full overflow-y-auto">
              <ProductsRequest
                storages={["products", "draft"]}
                request={getDraftProducts}
                component={ProductsTable}
              />
            </CardContent>
          </TabsContent>

          <TabsContent className="h-full" value="archived">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
                Produtos arquivados
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Lista de todos produtos arquivados no sistema
              </CardDescription>
            </CardHeader>

            <CardContent className="h-full overflow-y-auto">
              <ProductsRequest
                storages={["products", "archived"]}
                request={getArchivedProducts}
                component={ProductsTable}
              />
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
