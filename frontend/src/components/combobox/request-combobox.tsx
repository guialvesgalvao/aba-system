import { useQuery } from "@tanstack/react-query";
import { Combobox, ComboboxStrings } from "./combobox";
import { OptionValue } from "./interface";

interface IRequestComboboxProps {
  name?: string;

  storages: string[];
  request: () => Promise<OptionValue[]>;

  onChange?: (value: OptionValue) => void;
  selectedValue?: string | null;

  strings?: ComboboxStrings;
  icon?: React.ComponentType<{ className?: string }>;

  enabled?: boolean;
  disabled?: boolean;
  isError?: boolean;
}

export function RequestCombobox(props: Readonly<IRequestComboboxProps>) {
  const { name, storages, request, enabled = true, ...combobox } = props;

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
      isDisabled={!enabled}
      errorMessage={error?.message}
      {...combobox}
    />
  );
}
