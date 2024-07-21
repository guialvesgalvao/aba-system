import { useStatusParam } from "@/shared/hooks/use-status-param";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsStatusEnum } from "@/shared/enums/data";

export type TabValue = {
  text: string;
  value: string;
};

export function StatusTabsChooser() {
  const { statusTabs, currentStatus, onStatusChange } = useStatusParam();

  return (
    <Tabs
      onValueChange={(value) => onStatusChange(value as TabsStatusEnum)}
      defaultValue={currentStatus}
    >
      <TabsList defaultValue={currentStatus}>
        {statusTabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.text}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
