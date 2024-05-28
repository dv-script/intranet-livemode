"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SubmitButton } from "./submit-button";
import Link from "next/link";
import { useFormState } from "react-dom";
import { authenticateUser } from "../_actions/authenticate-user";
import { FormError } from "./form-error";

export function SignInForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(authenticateUser, initialState);

  return (
    <form action={dispatch} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Input
              name="email"
              placeholder="Digite seu e-mail"
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
          <div className="flex flex-col gap-2">
            <Input
              type="password"
              name="password"
              placeholder="Senha"
              className={state.errors?.password && "border-red-500"}
            />
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
          {state.success === false && (
            <FormError errorMessage={state.message} />
          )}
        </div>
        <div className="flex justify-end">
          <Button asChild variant="link" className="text-sm p-0 h-fit">
            <Link href="/">Esqueceu sua senha?</Link>
          </Button>
        </div>
      </div>
      <SubmitButton type="submit">Entrar</SubmitButton>
    </form>
  );
}
