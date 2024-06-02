"use client";

import { changeYourPassword } from "@/app/_actions/change-your-password";
import { SubmitButton } from "@/app/_components/submit-button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { User } from "@prisma/client";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";

export function ChangeYourPasswordForm({
  user,
}: {
  user: Pick<User, "name" | "email" | "id" | "role">;
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(changeYourPassword, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }
  }, [state.success, state.message]);

  return (
    <form action={dispatch} className="flex flex-col gap-6">
      <input type="hidden" name="id" value={user.id} />
      <div className="flex gap-3 flex-col">
        <Label>Senha atual</Label>
        <Input
          type="password"
          className={state.errors?.currentPassword && "border-red-500"}
          name="current-password"
          placeholder="Digite sua senha atual"
        />
        {state.errors?.currentPassword &&
          state.errors.currentPassword.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}
      </div>
      <div className="flex flex-col gap-3">
        <Label>Nova senha</Label>
        <Input
          type="password"
          className={state.errors?.newPassword && "border-red-500"}
          name="new-password"
          placeholder="Digite sua nova senha"
        />
        {state.errors?.newPassword &&
          state.errors.newPassword.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}
      </div>
      <div className="flex flex-col gap-3">
        <Label>Digite novamente sua nova senha</Label>
        <Input
          type="password"
          className={state.errors?.confirmNewPassword && "border-red-500"}
          name="confirm-new-password"
          placeholder="Digite novamente sua nova senha"
        />
        {state.errors?.confirmNewPassword &&
          state.errors.confirmNewPassword.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}
      </div>
      <SubmitButton className="mt-2">Alterar senha</SubmitButton>
    </form>
  );
}
