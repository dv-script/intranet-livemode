/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { editIntranet } from "@/app/_actions/edit-intranet";
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
import { Category, Prisma } from "@prisma/client";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export function EditIntranetForm({
  intranet,
  categories,
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Category[];
  intranet: Prisma.IntranetGetPayload<{ include: { category: true } }>;
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(editIntranet, initialState);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    intranet.category.name
  );

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      handleCloseDialog();
    }
  }, [state.success, handleCloseDialog]);

  return (
    <form action={dispatch} className="grid gap-4 py-4">
      <input type="hidden" name="id" value={intranet.id} />
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">Nome</Label>
        <div className="col-span-3 flex flex-col gap-2">
          <Input
            name="name"
            defaultValue={intranet.name}
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
            defaultValue={intranet.link}
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
            defaultValue={intranet.description || ""}
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
            defaultValue={intranet.category.name}
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
