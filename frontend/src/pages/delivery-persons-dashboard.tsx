import { DeliveryPersonsTable } from "@/components/delivery-persons/delivery-persons-table/delivery-persons-table";

import DeliveryPersonsService from "@/shared/services/delivery-persons-service";

import { DeliveryPerson } from "@/shared/factories/delivery-persons-factory";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeliveryPersonsForm } from "@/components/delivery-persons/delivery-persons-form/delivery-persons-form";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useStatusParam } from "@/shared/hooks/use-status-param";
import { RefreshButton } from "@/components/utilities/refresh-button";
import { fetchAppQuery } from "@/shared/helpers/query-helper/query-helper";
import { CardData } from "@/components/card-data/card-data";
import { TabRenderBasedStatus } from "@/components/tab-render-based-status/tab-render-based-status";
import { StatusTabsChooser } from "@/components/status-tabs-chooser/status-tabs-chooser";
import { TitlePage } from "@/components/title-page/title-page";
import { DeliveryPersonStatus } from "@/shared/types/delivery-persons-types";
import { IComponentRequestProps } from "@/components/component-request/component-request";

export function DeliveryPersonsDashboard() {
  const { getCurrentStatus } = useStatusParam();
  const { getAllDeliveryPersons, getDeliveryPersonsByStatus } =
    new DeliveryPersonsService();

  async function refreshPage() {
    const status = getCurrentStatus();
    await fetchAppQuery<DeliveryPerson[]>(["delivery-persons", status]);
  }

  function generateTable(
    status?: DeliveryPersonStatus
  ): IComponentRequestProps<DeliveryPerson> {
    if (!status) {
      return {
        storages: ["delivery-persons", "all"],
        request: getAllDeliveryPersons,
        component: DeliveryPersonsTable,
      };
    }

    return {
      storages: ["delivery-persons", status],
      request: () => getDeliveryPersonsByStatus(status),
      component: DeliveryPersonsTable,
    };
  }

  return (
    <Dialog>
      <header className="flex justify-between flex-wrap gap-2">
        <TitlePage
          title="Tipos de Entrega"
          subtitle="Gerencie seus tipos de entrega"
        />

        <div className="flex items-center gap-2">
          <RefreshButton text="Atualizar página" onClick={refreshPage} />

          <DeliveryPersonsForm
            trigger={
              <DialogTrigger asChild>
                <Button type="button" size="sm" className="gap-2">
                  <CirclePlus size={18} />
                  Criar Tipo de Entrega
                </Button>
              </DialogTrigger>
            }
            formKeys={["delivery-persons"]}
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
              <CardData<DeliveryPerson>
                title="Todos os Tipos de Entrega"
                description="Lista com todos os tipos de entrega cadastrados no sistema"
                table={generateTable()}
              />
            ),
            enabled: (
              <CardData<DeliveryPerson>
                title="Tipos de Entrega Ativos"
                description="Lista com tipos de entregas ativos no sistema"
                table={generateTable("enabled")}
              />
            ),
            archived: (
              <CardData<DeliveryPerson>
                title="Tipos de Entrega Arquivados"
                description="Lista com tipos de entregas arquivados no sistema"
                table={generateTable("archived")}
              />
            ),
            draft: (
              <CardData<DeliveryPerson>
                title="Tipos de Entrega Rascunho"
                description="Lista com tipos de entregas em rascunho no sistema"
                table={generateTable("draft")}
              />
            ),
          }}
        />
      </main>
    </Dialog>
  );
}
