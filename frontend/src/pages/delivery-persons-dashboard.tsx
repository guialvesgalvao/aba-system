import { DeliveryPersonsTable } from "@/components/delivery-persons/delivery-persons-table/delivery-persons-table";

import DeliveryPersonsService from "@/shared/services/delivery-persons-service";

import { DeliveryPerson } from "@/shared/factories/delivery-persons-factory";
import {
  Dialog,
  DialogContent,
  DialogTitle,
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

export function DeliveryPersonsDashboard() {
  const { getCurrentStatus } = useStatusParam();
  const {
    getAllDeliveryPersons,
    getDeliveryPersonsByStatus,
    getDeliveryPersonById,
  } = new DeliveryPersonsService();

  async function refreshPage() {
    const status = getCurrentStatus();
    await fetchAppQuery<DeliveryPerson[]>(["delivery-persons", status]);
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
                <Button type="button" size="sm" className="gap-2">
                  <CirclePlus size={18} />
                  Criar novo tipo de entrega
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-[1000px]">
                <DialogTitle>Criar Tipo de Entrega</DialogTitle>
                <DeliveryPersonsForm
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
              <CardData<DeliveryPerson>
                title="Todos os Tipos de Entrega"
                description="Lista com todos os tipos de entrega cadastrados no sistema"
                table={{
                  storage: ["delivery-persons", "all"],
                  request: getAllDeliveryPersons,
                  component: DeliveryPersonsTable,
                }}
                form={{
                  name: "delivery-persons",
                  request: getDeliveryPersonById,
                  component: DeliveryPersonsForm,
                }}
              />
            ),
            enabled: (
              <CardData<DeliveryPerson>
                title="Tipos de Entrega Ativos"
                description="Lista com tipos de entregas ativos no sistema"
                table={{
                  storage: ["delivery-persons", "enabled"],
                  request: () => getDeliveryPersonsByStatus("enabled"),
                  component: DeliveryPersonsTable,
                }}
                form={{
                  name: "delivery-persons",
                  request: getDeliveryPersonById,
                  component: DeliveryPersonsForm,
                }}
              />
            ),
            archived: (
              <CardData<DeliveryPerson>
                title="Tipos de Entrega Arquivados"
                description="Lista com tipos de entregas arquivados no sistema"
                table={{
                  storage: ["delivery-persons", "archived"],
                  request: () => getDeliveryPersonsByStatus("archived"),
                  component: DeliveryPersonsTable,
                }}
                form={{
                  name: "delivery-persons",
                  request: getDeliveryPersonById,
                  component: DeliveryPersonsForm,
                }}
              />
            ),
            draft: (
              <CardData<DeliveryPerson>
                title="Tipos de Entrega Rascunho"
                description="Lista com tipos de entregas em rascunho no sistema"
                table={{
                  storage: ["delivery-persons", "draft"],
                  request: () => getDeliveryPersonsByStatus("draft"),
                  component: DeliveryPersonsTable,
                }}
                form={{
                  name: "delivery-persons",
                  request: getDeliveryPersonById,
                  component: DeliveryPersonsForm,
                }}
              />
            ),
          }}
        />
      </Dialog>
    </div>
  );
}
