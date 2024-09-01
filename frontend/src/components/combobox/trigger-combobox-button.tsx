import { ChevronsUpDown, OctagonAlert } from "lucide-react";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

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

  function getIcon() {
    if (isFetching) {
      return <LoadingSpinner className="h-5 w-5" />;
    }

    if (isError) {
      return <OctagonAlert className="h-5 w-5" />;
    }

    return <ChevronsUpDown className="h-5 w-5" />;
  }

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
      {getIcon()}
    </Button>
  );
}
