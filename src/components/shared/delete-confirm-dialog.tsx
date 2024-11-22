import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import MainButton from "./main-button";

type DeleteConfirmDialogProps = {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  deleteLoading: boolean;
  functionDelete: () => void;
};

export const DeleteConfirmDialog = ({
  openDeleteDialog,
  setOpenDeleteDialog,
  deleteLoading,
  functionDelete,
}: DeleteConfirmDialogProps) => {
  return (
    <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
      <DialogContent className="min-w-[780px] max-lg:min-w-[90%] max-lg:max-w-[90%] border-none">
        <DialogHeader>
          <DialogTitle>Deletar Ativo</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja deletar este ativo?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="max-sm:grid max-sm:gap-3 col-span-full">
          <DialogClose className="px-4 py-2 border border-foreground/10 text-secondary-foreground font-bold text-sm rounded">
            Cancelar
          </DialogClose>
          <MainButton
            variant="destructive"
            isLoading={deleteLoading}
            onClick={functionDelete}
          >
            Deletar
          </MainButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
