"use client";

import { deleteCategory } from "@/app/_actions/delete-category";
import { SubmitButton } from "@/app/_components/submit-button";
import { Prisma } from "@prisma/client";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export function DeleteCategoryForm({
  category,
}: {
  category: Prisma.CategoryGetPayload<{ include: { intranets: true } }>;
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(deleteCategory, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }
  }, [state.success, state.message, state.errors]);

  return (
    <form action={dispatch}>
      <input type="hidden" name="id" value={category.id} />
      <SubmitButton type="submit">Deletar</SubmitButton>
    </form>
  );
}
