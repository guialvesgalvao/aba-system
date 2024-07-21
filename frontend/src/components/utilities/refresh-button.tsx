import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";

interface IRefreshButtonProps {
  text: string;
  onClick: () => Promise<void>;
}

export function RefreshButton(props: Readonly<IRefreshButtonProps>) {
  const { text, onClick } = props;

  return (
    <Button variant="outline" size="sm" className="gap-2" onClick={onClick}>
      <RefreshCcw size={18} />
      {text}
    </Button>
  );
}
