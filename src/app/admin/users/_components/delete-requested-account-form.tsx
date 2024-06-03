"use client";

import { deleteRequestedAccount } from "@/app/_actions/delete-requested-account";
import { SubmitButton } from "@/app/_components/submit-button";
import { RequestedAccount } from "@prisma/client";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export function DeleteRequestedAccountForm({
  requestedAccount,
}: {
  requestedAccount: RequestedAccount;
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(deleteRequestedAccount, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }

    if (state.errors?.id) {
      toast.error(state.message);
    }
  }, [state.success, state.message, state.errors]);

  return (
    <form action={dispatch}>
      <input type="hidden" name="id" value={requestedAccount.id} />
      <SubmitButton type="submit">Deletar</SubmitButton>
    </form>
  );
}
