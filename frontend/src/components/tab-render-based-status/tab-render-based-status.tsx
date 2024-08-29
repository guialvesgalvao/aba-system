import { TabsStatusEnum } from "@/shared/enums/data";
import { Tabs, TabsContent } from "../ui/tabs";
import { useStatusParam } from "@/shared/hooks/use-status-param";

interface ITabRenderBasedStatusProps {
  tabs: Partial<Record<TabsStatusEnum, React.ReactNode>>;
}

export function TabRenderBasedStatus(
  props: Readonly<ITabRenderBasedStatusProps>
) {
  const { tabs } = props;
  const { currentStatus, onStatusChange } = useStatusParam();

  return (
    <Tabs
      className="h-full flex flex-col"
      onValueChange={(value) => onStatusChange(value as TabsStatusEnum)}
      value={currentStatus}
    >
      <TabsContent className="h-full" value={TabsStatusEnum.All}>
        {tabs.all}
      </TabsContent>

      <TabsContent className="h-full" value={TabsStatusEnum.Active}>
        {tabs.enabled}
      </TabsContent>

      <TabsContent className="h-full" value={TabsStatusEnum.Closed}>
        {tabs.closed}
      </TabsContent>
      
      <TabsContent className="h-full" value={TabsStatusEnum.Archived}>
        {tabs.archived}
      </TabsContent>

      <TabsContent className="h-full" value={TabsStatusEnum.Draft}>
        {tabs.draft}
      </TabsContent>
    </Tabs>
  );
}
