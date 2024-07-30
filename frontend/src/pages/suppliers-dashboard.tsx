import { SuppliersTable } from "@/components/suppliers/suppliers-table/suppliers-table";

import SuppliersService from "@/shared/services/suppliers-service";

import { Supplier } from "@/shared/factories/suppliers-factory";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SuppliersForm } from "@/components/suppliers/suppliers-form/suppliers-form";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

import { useStatusParam } from "@/shared/hooks/use-status-param";
import { fetchAppQuery } from "@/shared/helpers/query-helper/query-helper";
import { RefreshButton } from "@/components/utilities/refresh-button";
import { StatusTabsChooser } from "@/components/status-tabs-chooser/status-tabs-chooser";
import { TabRenderBasedStatus } from "@/components/tab-render-based-status/tab-render-based-status";
import { CardData } from "@/components/card-data/card-data";

export function SuppliersDashboard() {
  const { getCurrentStatus } = useStatusParam();
  const { getAllSuppliers, getSuppliersByStatus, getSupplierById } =
    new SuppliersService();

  async function refreshPage() {
    const status = getCurrentStatus();
    await fetchAppQuery<Supplier[]>(["suppliers", status]);
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
                  Criar novo fornecedor
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-[1000px]">
                <DialogTitle>Criar fornecedor</DialogTitle>
                <SuppliersForm
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
              <CardData<Supplier>
                title="Todos os Fornecedores"
                description="Lista de todos os fornecedores cadastrados no sistema"
                table={{
                  storage: ["suppliers", "all"],
                  request: getAllSuppliers,
                  component: SuppliersTable,
                }}
                form={{
                  name: "suppliers",
                  request: getSupplierById,
                  component: SuppliersForm,
                }}
              />
            ),
            enabled: (
              <CardData<Supplier>
                title="Fornecedores Ativos"
                description="Lista de fornecedores ativos no sistema"
                table={{
                  storage: ["suppliers", "enabled"],
                  request: () => getSuppliersByStatus("enabled"),
                  component: SuppliersTable,
                }}
                form={{
                  name: "suppliers",
                  request: getSupplierById,
                  component: SuppliersForm,
                }}
              />
            ),
            archived: (
              <CardData<Supplier>
                title="Fornecedores Arquivados"
                description="Lista de fornecedores arquivados no sistema"
                table={{
                  storage: ["suppliers", "archived"],
                  request: () => getSuppliersByStatus("archived"),
                  component: SuppliersTable,
                }}
                form={{
                  name: "suppliers",
                  request: getSupplierById,
                  component: SuppliersForm,
                }}
              />
            ),
            draft: (
              <CardData<Supplier>
                title="Fornecedores Rascunho"
                description="Lista de fornecedores em rascunho no sistema"
                table={{
                  storage: ["suppliers", "draft"],
                  request: () => getSuppliersByStatus("draft"),
                  component: SuppliersTable,
                }}
                form={{
                  name: "suppliers",
                  request: getSupplierById,
                  component: SuppliersForm,
                }}
              />
            ),
          }}
        />
      </Dialog>
    </div>
  );
}
