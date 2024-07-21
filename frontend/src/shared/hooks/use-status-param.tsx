import { useSearchParams } from "react-router-dom";
import { TabsStatusEnum } from "../enums/data";
import { TabValue } from "@/components/status-tabs-chooser/status-tabs-chooser";

const TABS: TabValue[] = [
  { text: "Todos", value: TabsStatusEnum.All },
  { text: "Ativos", value: TabsStatusEnum.Active },
  { text: "Rascunhos", value: TabsStatusEnum.Draft },
  { text: "Arquivados", value: TabsStatusEnum.Archived },
];

type UseStatusParam = {
  statusTabs: TabValue[];
  currentStatus: TabsStatusEnum;
  getCurrentStatus: () => TabsStatusEnum;
  onStatusChange: (value: TabsStatusEnum) => void;
};

export function useStatusParam(): UseStatusParam {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = getCurrentStatus();

  function getCurrentStatus(): TabsStatusEnum {
    return (searchParams.get("status") as TabsStatusEnum) || TabsStatusEnum.All;
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

  return {
    statusTabs: TABS,
    currentStatus: status,
    onStatusChange: addOrRemoveStatusFromSearchParam,
    getCurrentStatus,
  };
}
