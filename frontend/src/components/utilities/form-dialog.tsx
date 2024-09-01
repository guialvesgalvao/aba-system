import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

interface IFormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;

  title: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
}

export function FormDialog(props: Readonly<IFormDialogProps>) {
  const { title, open, setOpen, trigger, children } = props;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger}

      <DialogContent className="max-w-[1000px]">
        <DialogTitle>{title}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}
