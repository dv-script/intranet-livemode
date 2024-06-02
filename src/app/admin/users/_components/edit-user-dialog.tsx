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
import { User } from "@prisma/client";
import { EditUserForm } from "./edit-user-form";
import { useState } from "react";

export function EditUserDialog({ user }: { user: Omit<User, "password"> }) {
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
          <DialogTitle>Editar intranet</DialogTitle>
          <DialogDescription>
            Edite as informações da intranet selecionada.
          </DialogDescription>
        </DialogHeader>
        <EditUserForm setIsOpen={setIsOpen} user={user} />
      </DialogContent>
    </Dialog>
  );
}
