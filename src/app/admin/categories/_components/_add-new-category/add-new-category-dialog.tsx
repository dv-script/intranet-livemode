"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { AddNewCategoryForm } from "./add-new-category-form";
import { useState } from "react";

export function AddNewCategoryDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenDialog}>
      <DialogTrigger asChild>
        <Button className="w-fit">Adicionar categoria</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Adicionar uma nova Categoria</DialogHeader>
        <DialogDescription>
          Adicione uma nova categoria na Intranet da Livemode
        </DialogDescription>
        <AddNewCategoryForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
