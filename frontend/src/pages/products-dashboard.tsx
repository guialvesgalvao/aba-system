import { ProductsFormCreate } from "@/components/products/products-form-create";
import { ProductsTable } from "@/components/products/products-table";
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
import { TabsContent } from "@radix-ui/react-tabs";
import { CirclePlus } from "lucide-react";

export function ProductsDashboard() {
  return (
    <div className="w-full h-full">
      <Tabs
        className="w-full h-full p-8 flex flex-col gap-4"
        defaultValue="all"
      >
        <div className="w-full flex justify-between">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Ativos</TabsTrigger>
            <TabsTrigger value="draft">Rascunhos</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Arquivados
            </TabsTrigger>
          </TabsList>

          <div>
            <Dialog>
              <DialogTrigger>
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
        </div>

        <TabsContent className="h-full" value="all">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
                Produtos
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Lista de produtos cadastrados
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ProductsTable
                products={[
                  {
                    id: 1,
                    title: "Produto 1",
                    description: "Descrição do produto 1",
                    active: "enabled",
                    created_at: "2021-09-01",
                    updated_at: "2021-09-01",
                  },
                  {
                    id: 2,
                    title: "Produto 2",
                    description: "Descrição do produto 2",
                    active: "draft",
                    created_at: "2021-09-01",
                    updated_at: "2021-09-01",
                  },
                  {
                    id: 3,
                    title: "Produto 3",
                    description: "Descrição do produto 3",
                    active: "archived",
                    created_at: "2021-09-01",
                    updated_at: "2021-09-01",
                  },
                  {
                    id: 4,
                    title: "Produto 4",
                    description: "Descrição do produto 4",
                    active: "enabled",
                    created_at: "2021-09-01",
                    updated_at: "2021-09-01",
                  },
                  {
                    id: 5,
                    title: "Produto 5",
                    description: "Descrição do produto 5",
                    active: "draft",
                    created_at: "2021-09-01",
                    updated_at: "2021-09-01",
                  },
                  {
                    id: 6,
                    title: "Produto 6",
                    description: "Descrição do produto 6",
                    active: "archived",
                    created_at: "2021-09-01",
                    updated_at: "2021-09-01",
                  },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
