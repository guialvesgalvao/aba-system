import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "../ui/use-toast";

interface IDeleteDialogProps {
  trigger: React.ReactNode;
  confirmMessage: string;
  onSubmit: () => Promise<void>;
  queryKey: string[];
}

export function DeleteDialog(props: Readonly<IDeleteDialogProps>) {
  const { trigger, confirmMessage, onSubmit, queryKey } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { mutate } = useMutation({
    mutationKey: queryKey,
    mutationFn: handleWhichAction,
  });

  async function handleWhichAction() {
    onSubmit();

    toast({
      variant: "default",
      title: "Item Excluído com sucesso"
    });

    setOpen(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <div onClick={handleOpen}>{trigger}</div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
          <AlertDialogDescription>{confirmMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive"
            type="submit"
            onClick={() => mutate()}
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
