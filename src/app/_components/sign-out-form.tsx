"use client";

import { logout } from "../_actions/logout";
import { SubmitButton } from "./submit-button";

export function SignOutForm() {
  return (
    <form action={logout}>
      <SubmitButton type="submit">Sair</SubmitButton>
    </form>
  );
}
