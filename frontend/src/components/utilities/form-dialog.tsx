import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

interface IFormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;

  trigger?: React.ReactNode;
  children: React.ReactNode;
}

export function FormDialog(props: Readonly<IFormDialogProps>) {
  const { open, setOpen, trigger, children } = props;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger}

      <DialogContent className="max-w-[1000px]">
        <DialogTitle>Criar Produto</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}
