"use server";

import { z } from "zod";
import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";

const editCategoryFormSchema = z.object({
  id: z.string(),
  name: z.string({ message: "O nome da categoria é obrigatória" }),
  description: z
    .string({ message: "A descrição precisa ser texto" })
    .optional(),
});

export type State = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message: string;
  success?: boolean;
};

export async function editCategory(_prevState: State, formData: FormData) {
  const validatedFields = editCategoryFormSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Por favor, preencha os campos corretamente.",
    };
  }

  const { id, name, description } = validatedFields.data;

  const validateUniqueName = await db.category.findFirst({
    where: {
      name,
    },
  });

  if (validateUniqueName && validateUniqueName.id !== id) {
    return {
      errors: {
        name: ["Nome da categoria já está em uso. Por favor, escolha outra."],
      },
      message: "Nome da categoria já está em uso. Por favor, escolha outra.",
    };
  }

  try {
    await db.category.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });

    revalidatePath("/admin/categories");
    return {
      message: "Categoria atualizada com sucesso.",
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: "Erro ao atualizar a categoria. Por favor, tente novamente.",
        success: false,
      };
    }
    throw error;
  }
}
