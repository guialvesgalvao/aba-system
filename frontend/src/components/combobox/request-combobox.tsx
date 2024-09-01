import { useQuery } from "@tanstack/react-query";
import { Combobox, ComboboxStrings, OptionValue } from "./combobox";

interface IRequestComboboxProps {
  storages: string[];
  request: () => Promise<OptionValue[]>;

  onChange?: (value: OptionValue) => void;

  strings?: ComboboxStrings;
  enabled?: boolean;
}

export function RequestCombobox(props: Readonly<IRequestComboboxProps>) {
  const { storages, request, enabled, ...combobox } = props;

  const { data, isFetching, isError } = useQuery({
    queryKey: ["combobox", ...storages],
    queryFn: request,
    retry: false,
    enabled,
    refetchOnWindowFocus: false,
  });

  return (
    <Combobox
      options={data ?? []}
      isError={isError}
      isFetching={isFetching}
      {...combobox}
    />
  );
}
