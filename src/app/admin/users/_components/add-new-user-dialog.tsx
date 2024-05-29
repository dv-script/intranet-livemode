"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { AddNewUserForm } from "./add-new-user-form";
import { useState } from "react";

export function AddNewUserDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-fit">
          Adicionar novo usuário
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>Adicionar um novo usuário</DialogHeader>
        <DialogDescription>
          Adicione um novo usuário na Intranet da Livemode
        </DialogDescription>
        <AddNewUserForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
