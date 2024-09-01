import { useQuery } from "@tanstack/react-query";
import { Combobox, ComboboxStrings } from "./combobox";
import { OptionValue } from "./interface";

interface IRequestComboboxProps {
  storages: string[];
  request: () => Promise<OptionValue[]>;

  onChange?: (value: OptionValue) => void;

  strings?: ComboboxStrings;
  enabled?: boolean;
}

export function RequestCombobox(props: Readonly<IRequestComboboxProps>) {
  const { storages, request, enabled, ...combobox } = props;

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["combobox", ...storages],
    queryFn: request,
    retry: 2,
    enabled,
    refetchOnWindowFocus: false,
  });

  return (
    <Combobox
      options={data ?? []}
      isError={isError}
      isFetching={isFetching}
      errorMessage={error?.message}
      {...combobox}
    />
  );
}
