"use client";

import { editUser } from "@/app/_actions/edit-user";
import { SubmitButton } from "@/app/_components/submit-button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Role, Status, User } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

const roles: Role[] = ["ADMIN", "USER"];
const status: Status[] = ["ACTIVE", "INACTIVE", "SUSPENDED"];

export function EditUserForm({
  user,
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: Omit<User, "password">;
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(editUser, initialState);

  const [selectedRole, setSelectedRole] = useState<Role>(user.role);
  const [selectedStatus, setSelectedStatus] = useState<Status>(user.status);

  const handleRoleChange = (value: Role) => {
    setSelectedRole(value);
  };

  const handleStatusChange = (value: Status) => {
    setSelectedStatus(value);
  };

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      handleCloseDialog();
    }
  }, [state.success, state.message, handleCloseDialog]);

  return (
    <form action={dispatch} className="grid gap-4 py-4">
      <input type="hidden" name="id" value={user.id} />
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">Nome</Label>
        <div className="col-span-3 flex flex-col gap-2">
          <Input
            name="name"
            defaultValue={user.name}
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
            defaultValue={user.email}
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
        <Label className="text-right">Cargo</Label>
        <div className="col-span-3 flex flex-col gap-2">
          <Select
            name="role"
            defaultValue={user.role}
            onValueChange={handleRoleChange}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue>{selectedRole}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem value={role} key={role}>
                  {role}
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
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">Status</Label>
        <div className="col-span-3 flex flex-col gap-2">
          <Select
            name="status"
            defaultValue={user.status}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue>{selectedStatus}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {status.map((stat) => (
                <SelectItem value={stat} key={stat}>
                  {stat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state.errors?.status &&
            state.errors.status.map((error) => (
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
        <SubmitButton className="w-fit">Salvar alterações</SubmitButton>
      </div>
    </form>
  );
}
