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
    <TabsList defaultValue={defaultTab}>
      {tabs.map((tab) => (
        <TabsTrigger key={tab.value} value={tab.value}>
          {tab.text}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
