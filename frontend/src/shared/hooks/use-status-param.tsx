import { useLocation, useSearchParams } from "react-router-dom";
import { TabsStatusEnum } from "../enums/data";
import { TabValue } from "@/components/status-tabs-chooser/status-tabs-chooser";
import { DefaultTabs, OrderTabs } from "../constants";
import { SystemRoutes } from "../enums/app";

type UseStatusParam = {
  statusTabs: TabValue[];
  currentStatus: TabsStatusEnum;
  getCurrentStatus: () => TabsStatusEnum;
  onStatusChange: (value: TabsStatusEnum) => void;
};

export function useStatusParam(): UseStatusParam {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = getCurrentStatus();
  const { pathname } = useLocation();

  const tabs = pathname === SystemRoutes.ORDERS ? OrderTabs : DefaultTabs;

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
    statusTabs: tabs,
    currentStatus: status,
    onStatusChange: addOrRemoveStatusFromSearchParam,
    getCurrentStatus,
  };
}
