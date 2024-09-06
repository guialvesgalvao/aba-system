import { useQuery } from "@tanstack/react-query";
import { Combobox, ComboboxStrings } from "./combobox";
import { OptionValue } from "./interface";

interface IRequestComboboxProps {
  storages: string[];
  request: () => Promise<OptionValue[]>;

  onChange?: (value: OptionValue) => void;
  selectedValue?: string | null;

  strings?: ComboboxStrings;
  enabled?: boolean;
  icon?: React.ComponentType<{ className?: string }>;

  isError?: boolean;
}

export function RequestCombobox(props: Readonly<IRequestComboboxProps>) {
  const { storages, request, enabled, ...combobox } = props;

  const {
    data,
    isFetching,
    isError: isMountingError,
    error,
  } = useQuery({
    queryKey: ["combobox", ...storages],
    queryFn: request,
    retry: 2,
    enabled,
    refetchOnWindowFocus: false,
  });

  return (
    <Combobox
      options={data ?? []}
      isMountingError={isMountingError}
      isFetching={isFetching}
      errorMessage={error?.message}
      {...combobox}
    />
  );
}
