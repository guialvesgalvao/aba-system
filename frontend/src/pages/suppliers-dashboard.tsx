import { ComponentRequest } from "@/components/component-request/component-request";
import { SuppliersTable } from "@/components/suppliers/suppliers-table/suppliers-table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { TabsStatusEnum } from "@/shared/enums/data";

import SuppliersService from "@/shared/services/suppliers-service";

import { useSearchParams } from "react-router-dom";
import { Supplier } from "@/shared/factories/suppliers-factory";
import {
  DashboardTabs,
  TabValue,
} from "@/components/dashboard-tabs/dashboard-tabs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormRequest } from "@/components/form-request/form-request";
import { SuppliersForm } from "@/components/suppliers/suppliers-form/suppliers-form";
import { Button } from "@/components/ui/button";
import { RefreshCcw, CirclePlus } from "lucide-react";

const TABS: TabValue[] = [
  { text: "Todos", value: TabsStatusEnum.All },
  { text: "Ativos", value: TabsStatusEnum.Active },
  { text: "Rascunhos", value: TabsStatusEnum.Draft },
  { text: "Arquivados", value: TabsStatusEnum.Archived },
];

export function SuppliersDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = getDefaultTab();
  const currentTab = searchParams.get("status") as TabsStatusEnum;

  const { getSuppliers, getSupplierById } = new SuppliersService();

  function getDefaultTab(): TabsStatusEnum {
    return (searchParams.get("status") as TabsStatusEnum) || TabsStatusEnum.All;
  }

  function handleTabChange(value: string) {
    addOrRemoveStatusFromSearchParam(value as TabsStatusEnum);
  }

  function addOrRemoveStatusFromSearchParam(value: TabsStatusEnum) {
    const searchStatusParam = searchParams.has("status");

    if (searchStatusParam && value === TabsStatusEnum.All) {
      searchParams.delete("status");
    } else {
      searchParams.set("status", value);
    }

    setSearchParams(searchParams);
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 py-4 px-6">
      <Tabs
        onValueChange={handleTabChange}
        className="w-full h-full flex flex-col gap-4"
        defaultValue={defaultTab}
      >
        <Dialog>
          <div className="flex justify-between">
            <DashboardTabs tabs={TABS} />

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCcw size={18} />
                Atualizar
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <CirclePlus size={18} />
                    Criar novo fornecedor
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-[1000px]">
                  <DialogTitle>Criar Fornecedor</DialogTitle>
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

          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
                Todos os Fornecedores
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Lista de todos os fornecedores cadastrados no sistema
              </CardDescription>
            </CardHeader>

            <CardContent className="h-full">
              <div className="h-full">
                <ComponentRequest<Supplier>
                  storages={["origins", currentTab]}
                  request={getSuppliers}
                  component={SuppliersTable}
                />
              </div>

              <DialogContent className="max-w-[1000px]">
                <DialogTitle>Editar Fornecedor</DialogTitle>
                <FormRequest
                  component={SuppliersForm}
                  form="suppliers"
                  request={getSupplierById}
                />
              </DialogContent>
            </CardContent>
          </Card>
        </Dialog>
      </Tabs>
    </div>
  );
}
