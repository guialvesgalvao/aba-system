import { RefreshCcw, CirclePlus } from "lucide-react";
import { ProductsForm } from "../products/products-form/products-form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { TabsList, TabsTrigger } from "../ui/tabs";

export type TabValue = {
  text: string;
  value: string;
};

interface IDashboardTabsProps {
  defaultTab?: string;
  tabs: TabValue[];
}

export function DashboardTabs(props: IDashboardTabsProps) {
  const { defaultTab, tabs } = props;

  return (
    <div className="w-full flex justify-between">
      <TabsList defaultValue={defaultTab}>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.text}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="flex items-center gap-2">
        <Button className="gap-2">
          <RefreshCcw size={18} />
          Atualizar
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <CirclePlus size={18} />
              Criar novo produto
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-[1000px]">
            <ProductsForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
