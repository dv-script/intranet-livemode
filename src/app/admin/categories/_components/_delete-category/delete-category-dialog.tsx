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
import { DeleteCategoryForm } from "./delete-category-form";

export function DeleteCategoryDialog({
  category,
}: {
  category: Prisma.CategoryGetPayload<{ include: { intranets: true } }>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2 justify-normal">
          Deletar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deseja deletar {category.name}?</DialogTitle>
          <DialogDescription>
            Ao deletar esta categoria, você não poderá recuperá-la. Tem certeza
            que deseja deletar?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-6">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <DeleteCategoryForm category={category} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
