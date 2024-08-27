import { createContext } from "react";
import { IStaticTableProps } from "./static-table";

export const StaticTableContext = createContext<IStaticTableProps<unknown>>(
  {} as IStaticTableProps<unknown>
);

interface IStaticTableContextProviderProps<TData> {
  children: React.ReactNode;
  table: IStaticTableProps<TData>;
}

export function StaticTableContextProvider<TData>(
  props: Readonly<IStaticTableContextProviderProps<TData>>
) {
  const { children, table } = props;

  return (
    <StaticTableContext.Provider value={table as IStaticTableProps<unknown>}>
      {children}
    </StaticTableContext.Provider>
  );
}
