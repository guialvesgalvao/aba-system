import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";

interface IRefetchButtonProps {
  refetch: () => Promise<void>;
}

export function RefetchButton(props: Readonly<IRefetchButtonProps>) {
  const { refetch } = props;

  return (
    <Button variant="outline" onClick={() => refetch()}>
      <RefreshCcw className="w-5 h-5" />
    </Button>
  );
}
