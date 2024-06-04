"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/app/_components/ui/dialog";
import { Prisma } from "@prisma/client";
import { EditCategoryForm } from "./edit-category-form";
import { useState } from "react";

export function EditCategoryDialog({
  category,
}: {
  category: Prisma.CategoryGetPayload<{
    include: {
      intranets: true;
    };
  }>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2 justify-normal">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar {category.name}</DialogTitle>
          <DialogDescription>
            Edite as informações da categaoria selecionada.
          </DialogDescription>
        </DialogHeader>
        <EditCategoryForm setIsOpen={setIsOpen} category={category} />
      </DialogContent>
    </Dialog>
  );
}
