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

export function CustomersDashboard() {
  const { getCurrentStatus } = useStatusParam();
  const { getAllCustomers, getCustomersByStatus, getCustomerById } =
    new CustomersService();

  async function refreshPage() {
    const status = getCurrentStatus();
    await fetchAppQuery<Customer[]>(["customers", status]);
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 py-4 px-6">
      <div className="w-full h-full flex flex-col gap-4">
        <Dialog>
          <div className="flex justify-between flex-wrap gap-2">
            <StatusTabsChooser />

            <div className="flex items-center gap-2">
              <RefreshButton text="Atualizar página" onClick={refreshPage} />

              <Dialog modal>
                <DialogTrigger asChild>
                  <Button type="button" size="sm" className="gap-2">
                    <CirclePlus size={18} />
                    Criar novo cliente
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
          </div>

          <TabRenderBasedStatus
            tabs={{
              all: (
                <CardData<Customer>
                  title="Todos os Clientes"
                  description="Lista de todos os clientes"
                  table={{
                    storage: ["customers", "all"],
                    request: getAllCustomers,
                    component: CustomersTable,
                  }}
                  form={{
                    name: "customers",
                    request: getCustomerById,
                    component: CustomersForm,
                  }}
                />
              ),
              enabled: (
                <CardData<Customer>
                  title="Clientes Ativos"
                  description="Lista de clientes ativos no sistema"
                  table={{
                    storage: ["customers", "enabled"],
                    request: () => getCustomersByStatus("enabled"),
                    component: CustomersTable,
                  }}
                  form={{
                    name: "customers",
                    request: getCustomerById,
                    component: CustomersForm,
                  }}
                />
              ),
              archived: (
                <CardData<Customer>
                  title="Clientes Arquivados"
                  description="Lista de clientes arquivados no sistema"
                  table={{
                    storage: ["customers", "archived"],
                    request: () => getCustomersByStatus("archived"),
                    component: CustomersTable,
                  }}
                  form={{
                    name: "customers",
                    request: getCustomerById,
                    component: CustomersForm,
                  }}
                />
              ),
              draft: (
                <CardData<Customer>
                  title="Clientes em Rascunho"
                  description="Lista de clientes em rascunho no sistema"
                  table={{
                    storage: ["customers", "draft"],
                    request: () => getCustomersByStatus("draft"),
                    component: CustomersTable,
                  }}
                  form={{
                    name: "customers",
                    request: getCustomerById,
                    component: CustomersForm,
                  }}
                />
              ),
            }}
          />
        </Dialog>
      </div>
    </div>
  );
}
