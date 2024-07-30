import { RefreshCcw } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";

interface IRefreshButtonProps extends ButtonProps {
  text: string;
  onClick: () => Promise<void>;
}

export function RefreshButton(props: Readonly<IRefreshButtonProps>) {
  const { text, onClick, ...rest } = props;

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={onClick}
      {...rest}
    >
      <RefreshCcw size={18} />
      {text}
    </Button>
  );
}
