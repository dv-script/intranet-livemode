"use client";

import { addNewUser } from "@/app/_actions/add-new-user";
import { SubmitButton } from "@/app/_components/submit-button";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { createHash } from "@/app/_utils/create-hash";
import { Role } from "@prisma/client";
import { LockKeyholeIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

interface Roles {
  id: number;
  name: Role;
}

const roles: Roles[] = [
  { id: 1, name: "USER" },
  { id: 2, name: "ADMIN" },
];

export function AddNewUserForm({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(addNewUser, initialState);

  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const generatePassword = () => {
    const hash = createHash();
    setPassword(hash);
  };

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleRoleChange = useCallback((value: string) => {
    setSelectedRole(value);
  }, []);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      handleCloseDialog();
    }
  }, [state.success, state.message, handleCloseDialog]);

  return (
    <form action={dispatch} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">Nome</Label>
        <div className="col-span-3 flex flex-col gap-2">
          <Input
            name="name"
            placeholder="Insira o nome do usuário"
            className={state.errors?.name && "border-red-500"}
          />
          {state.errors?.name &&
            state.errors.name.map((error) => (
              <p
                aria-live="polite"
                key={error}
                className="text-xs text-red-500"
              >
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">E-mail</Label>
        <div className="col-span-3 flex flex-col gap-2">
          <Input
            name="email"
            placeholder="Insira o e-mail do usuário"
            className={state.errors?.email && "border-red-500"}
          />
          {state.errors?.email &&
            state.errors.email.map((error) => (
              <p
                aria-live="polite"
                key={error}
                className="text-xs text-red-500"
              >
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">Senha</Label>
        <div className="col-span-3 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Input
              name="password"
              value={password}
              placeholder="Insira a senha do usuário"
              className={state.errors?.password && "border-red-500"}
            />
            <Button
              onClick={generatePassword}
              type="button"
              variant="secondary"
              size="icon"
            >
              <LockKeyholeIcon size={16} />
            </Button>
          </div>
          {state.errors?.password &&
            state.errors.password.map((error) => (
              <p
                aria-live="polite"
                key={error}
                className="text-xs text-red-500"
              >
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">Cargo</Label>
        <div className="col-span-3 flex flex-col gap-2">
          <Select name="role" onValueChange={handleRoleChange}>
            <SelectTrigger className="col-span-3">
              <SelectValue>{selectedRole}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem value={role.name} key={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state.errors?.role &&
            state.errors.role.map((error) => (
              <p
                aria-live="polite"
                key={error}
                className="text-xs text-red-500"
              >
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="flex justify-end">
        <SubmitButton type="submit" className="w-fit">
          Criar usuário
        </SubmitButton>
      </div>
    </form>
  );
}
