import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { FieldValues, useFormContext } from "react-hook-form";

export function SubmitDialog<T extends FieldValues>(props: {
  isEditMode: boolean;
  onSubmit: (data: T) => Promise<T | void>;
}) {
  const { isEditMode, onSubmit } = props;

  const { formState, handleSubmit } = useFormContext<T>();

  const { isValid, isSubmitting, isSubmitSuccessful } = formState;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          disabled={!isValid || isSubmitSuccessful || isSubmitting}
        >
          {isEditMode ? "Salvar tipo de entrega" : "Criar tipo da entrega"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
          <AlertDialogDescription>
            {isEditMode
              ? "Ao clicar em salvar, as alterações serão salvas no sistema. Deseja continuar?"
              : "Deseja realizar a criação do produto no sistema?"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction type="submit" onClick={handleSubmit(onSubmit)}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
