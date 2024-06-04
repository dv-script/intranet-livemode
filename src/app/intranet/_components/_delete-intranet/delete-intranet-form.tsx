"use client";

import { deleteIntranet } from "@/app/_actions/delete-intranet";
import { SubmitButton } from "@/app/_components/submit-button";
import { Prisma } from "@prisma/client";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export function DeleteIntranetForm({
  intranet,
}: {
  intranet: Prisma.IntranetGetPayload<{ include: { category: true } }>;
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(deleteIntranet, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }
  }, [state.success, state.message]);

  return (
    <form action={dispatch}>
      <input type="hidden" name="id" value={intranet.id} />
      <SubmitButton type="submit">Deletar</SubmitButton>
    </form>
  );
}
