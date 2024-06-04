"use client";

import { addNewIntranet } from "@/app/_actions/add-new-intranet";
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
import { Category } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export function AddNewIntranetForm({
  categories,
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Category[];
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(addNewIntranet, initialState);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].name
  );

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
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
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">Nome</Label>
        <div className="col-span-3 flex flex-col gap-2">
          <Input
            name="name"
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
        <Label className="text-right">Link</Label>
        <div className="col-span-3 flex flex-col gap-2">
          <Input
            name="link"
            className={state.errors?.link && "border-red-500"}
          />
          {state.errors?.link &&
            state.errors.link.map((error) => (
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
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">Categoria</Label>
        <div className="col-span-3 flex flex-col gap-2">
          <Select
            name="category"
            defaultValue={selectedCategory}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue>{selectedCategory}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem value={category.name} key={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state.errors?.category &&
            state.errors.category.map((error) => (
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
