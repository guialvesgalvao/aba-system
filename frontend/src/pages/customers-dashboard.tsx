import { CustomersTable } from "@/components/customers/customers-table/customers-table";

import CustomersService from "@/shared/services/customers-service";

import { Customer } from "@/shared/factories/customers-factory";
import { StatusTabsChooser } from "@/components/status-tabs-chooser/status-tabs-chooser";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomersForm } from "@/components/customers/customers-form/customers-form";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useStatusParam } from "@/shared/hooks/use-status-param";
import { RefreshButton } from "@/components/utilities/refresh-button";
import { fetchAppQuery } from "@/shared/helpers/query-helper/query-helper";
import { CardData } from "@/components/card-data/card-data";
import { TabRenderBasedStatus } from "@/components/tab-render-based-status/tab-render-based-status";
import { TitlePage } from "@/components/title-page/title-page";
import { CustomerStatus } from "@/shared/types/customers-types";
import { IComponentRequestProps } from "@/components/component-request/component-request";

export function CustomersDashboard() {
  const { getCurrentStatus } = useStatusParam();
  const { getAllCustomers, getCustomersByStatus } =
    new CustomersService();

  async function refreshPage() {
    const status = getCurrentStatus();
    await fetchAppQuery<Customer[]>(["customers", status]);
  }

  function generateTable(
    status?: CustomerStatus
  ): IComponentRequestProps<Customer> {
    if (!status) {
      return {
        storages: ["customers", "all"],
        request: getAllCustomers,
        component: CustomersTable,
      };
    }

    return {
      storages: ["customers", status],
      request: () => getCustomersByStatus(status),
      component: CustomersTable,
    };
  }

  return (
    <Dialog>
      <header className="flex justify-between flex-wrap gap-2">
        <TitlePage title="Clientes" subtitle="Gerencie seus clientes" />

        <div className="flex items-center gap-2">
          <RefreshButton text="Atualizar página" onClick={refreshPage} />

          <Dialog modal>
            <DialogTrigger asChild>
              <Button type="button" size="sm" className="gap-2">
                <CirclePlus size={18} />
                Criar novo
              </Button>
            </DialogTrigger>

            <DialogContent
              onInteractOutside={(event) => event.preventDefault()}
              className="max-w-[1000px]"
            >
              <DialogTitle>Criar Cliente</DialogTitle>
              <CustomersForm
                item={undefined}
                isLoading={false}
                isFetching={false}
                isError={false}
                error={null}
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
              <CardData<Customer>
                title="Todos os Clientes"
                description="Lista de todos os clientes"
                table={generateTable()}
              />
            ),
            enabled: (
              <CardData<Customer>
                title="Clientes Ativos"
                description="Lista de clientes ativos no sistema"
                table={generateTable("enabled")}
              />
            ),
            archived: (
              <CardData<Customer>
                title="Clientes Arquivados"
                description="Lista de clientes arquivados no sistema"
                table={generateTable("archived")}
              />
            ),
            draft: (
              <CardData<Customer>
                title="Clientes em Rascunho"
                description="Lista de clientes em rascunho no sistema"
                table={generateTable("draft")}
              />
            ),
          }}
        />
      </main>
    </Dialog>
  );
}
