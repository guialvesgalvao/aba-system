import { OriginsTable } from "@/components/origins/origins-table/origins-table";

import OriginsService from "@/shared/services/origins-service";

import { Origin } from "@/shared/factories/origins-factory";
import { StatusTabsChooser } from "@/components/status-tabs-chooser/status-tabs-chooser";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OriginsForm } from "@/components/origins/origins-form/origins-form";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useStatusParam } from "@/shared/hooks/use-status-param";
import { RefreshButton } from "@/components/utilities/refresh-button";
import { fetchAppQuery } from "@/shared/helpers/query-helper/query-helper";
import { CardData } from "@/components/card-data/card-data";
import { TabRenderBasedStatus } from "@/components/tab-render-based-status/tab-render-based-status";
import { TitlePage } from "@/components/title-page/title-page";

export function OriginsDashboard() {
  const { getCurrentStatus } = useStatusParam();
  const { getAllOrigins, getOriginsByStatus, getOriginById } =
    new OriginsService();

  async function refreshPage() {
    const status = getCurrentStatus();
    await fetchAppQuery<Origin[]>(["origins", status]);
  }

  return (
    <Dialog>
      <header className="flex justify-between flex-wrap gap-2">
        <TitlePage title="Origens" subtitle="Gerencie suas origens" />

        <div className="flex items-center gap-2">
          <RefreshButton text="Atualizar página" onClick={refreshPage} />

          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" size="sm" className="gap-2">
                <CirclePlus size={18} />
                Criar nova
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[1000px]">
              <DialogTitle>Criar origem</DialogTitle>
              <OriginsForm
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
              <CardData<Origin>
                title="Todas as Origens"
                description="Lista de todas as origens no sistema"
                table={{
                  storage: ["origins", "all"],
                  request: getAllOrigins,
                  component: OriginsTable,
                }}
                form={{
                  name: "origins",
                  request: getOriginById,
                  component: OriginsForm,
                }}
              />
            ),
            enabled: (
              <CardData<Origin>
                title="Origens Ativos"
                description="Lista de origens ativos no sistema"
                table={{
                  storage: ["origins", "enabled"],
                  request: () => getOriginsByStatus("enabled"),
                  component: OriginsTable,
                }}
                form={{
                  name: "origins",
                  request: getOriginById,
                  component: OriginsForm,
                }}
              />
            ),
            archived: (
              <CardData<Origin>
                title="Origens Arquivados"
                description="Lista de origens arquivados no sistema"
                table={{
                  storage: ["origins", "archived"],
                  request: () => getOriginsByStatus("archived"),
                  component: OriginsTable,
                }}
                form={{
                  name: "origins",
                  request: getOriginById,
                  component: OriginsForm,
                }}
              />
            ),
            draft: (
              <CardData<Origin>
                title="Origens em Rascunho"
                description="Lista de origens em rascunho no sistema"
                table={{
                  storage: ["origins", "draft"],
                  request: () => getOriginsByStatus("draft"),
                  component: OriginsTable,
                }}
                form={{
                  name: "origins",
                  request: getOriginById,
                  component: OriginsForm,
                }}
              />
            ),
          }}
        />
      </main>
    </Dialog>
  );
}
