"use client";

import { addNewCategory } from "@/app/_actions/add-new-category";
import { SubmitButton } from "@/app/_components/submit-button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import React, { useCallback, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export function AddNewCategoryForm({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(addNewCategory, initialState);

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
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">Nome da categoria</Label>
        <div className="col-span-3 flex flex-col gap-2">
          <Input
            name="name"
            placeholder="Insira o nome da categoria"
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
            name="email"
            placeholder="Insira a descrição da categoria"
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
        <SubmitButton type="submit" className="w-fit">
          Criar categoria
        </SubmitButton>
      </div>
    </form>
  );
}
