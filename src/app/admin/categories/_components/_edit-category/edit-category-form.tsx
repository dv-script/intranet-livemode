"use client";

import { editCategory } from "@/app/_actions/edit-category";
import { SubmitButton } from "@/app/_components/submit-button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Prisma } from "@prisma/client";
import { useCallback, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export function EditCategoryForm({
  category,
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category: Prisma.CategoryGetPayload<{
    include: {
      intranets: true;
    };
  }>;
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(editCategory, initialState);

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
      <input type="hidden" name="id" value={category.id} />
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">Nome</Label>
        <div className="col-span-3 flex flex-col gap-2">
          <Input
            name="name"
            defaultValue={category.name}
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
        <Label className="text-right">Descrição</Label>
        <div className="col-span-3 flex flex-col gap-2">
          <Input
            name="description"
            defaultValue={category.description ? category.description : ""}
            className={state.errors?.description && "border-red-500"}
          />
          {state.errors?.description &&
            state.errors.description.map((error) => (
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
