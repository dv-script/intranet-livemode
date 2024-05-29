"use client";

import { useFormState } from "react-dom";
import { Input } from "./ui/input";
import { requestAccount } from "../_actions/request-account";
import { SubmitButton } from "./submit-button";
import { toast } from "sonner";
import { useEffect } from "react";

export function RequestAccountForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(requestAccount, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }
  }, [state.success, state.message]);

  return (
    <form action={dispatch} className="w-fit mx-auto flex flex-col gap-2">
      <p className="text-muted-foreground text-sm">
        Ainda não possui uma conta?{" "}
        <strong className="text-white">Solicite aqui!</strong>
      </p>
      <div className="flex gap-3">
        <div className="flex flex-col flex-1 gap-2">
          <Input
            name="email"
            placeholder="Digite seu e-mail"
            className={state.errors?.email && "border-red-500"}
          />
          <div className="flex flex-col">
            {state?.errors?.email?.map((error: string) => (
              <span key={error} className="text-red-500 text-xs">
                {error}
              </span>
            ))}
          </div>
        </div>
        <SubmitButton variant="secondary">Solicitar</SubmitButton>
      </div>
    </form>
  );
}
