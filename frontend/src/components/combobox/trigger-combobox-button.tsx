import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { GenerateIcon } from "./generate-icon-status";

interface ITriggerComboboxButtonProps {
  isError: boolean;
  isFetching: boolean;

  currentValue?: string;
  placeholder?: string;
}

export function TriggerComboboxButton(
  props: Readonly<ITriggerComboboxButtonProps>
) {
  const { isError, isFetching, currentValue, placeholder } = props;

  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        "w-full justify-between",
        isError && "text-destructive border-destructive",
        isFetching && "text-muted-foreground border-muted-foreground"
      )}
      disabled={isFetching || isError}
    >
      {currentValue ?? placeholder}
      <GenerateIcon isError={isError} isFetching={isFetching} />
    </Button>
  );
}
