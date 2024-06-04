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
import { Category } from "@prisma/client";
import { useState } from "react";
import { AddNewIntranetForm } from "./add-new-intranet-form";

export function AddNewIntranetDialog({
  categories,
}: {
  categories: Category[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit" variant="outline">
          Adicionar intranet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar intranet</DialogTitle>
          <DialogDescription>
            Adicione uma nova intranet ao sistema.
          </DialogDescription>
        </DialogHeader>
        <AddNewIntranetForm setIsOpen={setIsOpen} categories={categories} />
      </DialogContent>
    </Dialog>
  );
}
