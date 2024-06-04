import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/app/_components/ui/dialog";
import { Prisma } from "@prisma/client";
import { DeleteIntranetForm } from "./delete-intranet-form";

export function DeleteIntranetDialog({
  intranet,
}: {
  intranet: Prisma.IntranetGetPayload<{ include: { category: true } }>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deseja deletar {intranet.name}?</DialogTitle>
          <DialogDescription>
            Ao deletar esta intranet, você não poderá recuperá-la. Tem certeza
            que deseja deletar?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-6">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <DeleteIntranetForm intranet={intranet} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
