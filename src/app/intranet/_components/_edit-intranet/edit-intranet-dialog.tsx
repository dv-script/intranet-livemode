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
import { Category, Prisma } from "@prisma/client";
import { EditIntranetForm } from "./edit-intranet-form";
import { useState } from "react";

export function EditIntranetDialog({
  intranet,
  categories,
}: {
  categories: Category[];
  intranet: Prisma.IntranetGetPayload<{ include: { category: true } }>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar intranet</DialogTitle>
          <DialogDescription>
            Edite as informações da intranet selecionada.
          </DialogDescription>
        </DialogHeader>
        <EditIntranetForm
          setIsOpen={setIsOpen}
          categories={categories}
          intranet={intranet}
        />
      </DialogContent>
    </Dialog>
  );
}
