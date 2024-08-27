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
import { TitlePage } from "@/components/title-page/title-page";
import { SupplierStatus } from "@/shared/types/suppliers-types";
import { IComponentRequestProps } from "@/components/component-request/component-request";

export function SuppliersDashboard() {
  const { getCurrentStatus } = useStatusParam();
  const { getAllSuppliers, getSuppliersByStatus } =
    new SuppliersService();

  async function refreshPage() {
    const status = getCurrentStatus();
    await fetchAppQuery<Supplier[]>(["suppliers", status]);
  }
  
  function generateTable(
    status?: SupplierStatus
  ): IComponentRequestProps<Supplier> {
    if (!status) {
      return {
        storages: ["suppliers", "all"],
        request: getAllSuppliers,
        component: SuppliersTable,
      };
    }

    return {
      storages: ["suppliers", status],
      request: () => getSuppliersByStatus(status),
      component: SuppliersTable,
    };
  }

  return (
    <Dialog>
      <header className="flex justify-between flex-wrap gap-2">
        <TitlePage title="Fornecedores" subtitle="Gerencie seus fornecedores" />

        <div className="flex items-center gap-2">
          <RefreshButton text="Atualizar página" onClick={refreshPage} />

          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" size="sm" className="gap-2">
                <CirclePlus size={18} />
                Criar novo
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[1000px]">
              <DialogTitle>Criar fornecedor</DialogTitle>
              <SuppliersForm
                item={undefined}
                isLoading={false}
                isFetching={false}
                formKeys={["suppliers"]}
              />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-2 md:gap-4">
        <StatusTabsChooser />

        <TabRenderBasedStatus
          tabs={{
            all: (
              <CardData<Supplier>
                title="Todos os Fornecedores"
                description="Lista de todos os fornecedores cadastrados no sistema"
                table={generateTable()}
              />
            ),
            enabled: (
              <CardData<Supplier>
                title="Fornecedores Ativos"
                description="Lista de fornecedores ativos no sistema"
                table={generateTable('enabled')}
              />
            ),
            archived: (
              <CardData<Supplier>
                title="Fornecedores Arquivados"
                description="Lista de fornecedores arquivados no sistema"
                table={generateTable('archived')}
              />
            ),
            draft: (
              <CardData<Supplier>
                title="Fornecedores Rascunho"
                description="Lista de fornecedores em rascunho no sistema"
                table={generateTable('draft')}
              />
            ),
          }}
        />
      </main>
    </Dialog>
  );
}
