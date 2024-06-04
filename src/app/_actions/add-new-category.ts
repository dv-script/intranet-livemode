"use server";

import { z } from "zod";
import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";

const addNewCategoryFormSchema = z.object({
  name: z.string({ message: "O nome da categoria é obrigatória" }),
  description: z
    .string({ message: "A descrição precisa ser texto" })
    .optional()
    .nullable(),
});

export type State = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message: string;
  success?: boolean;
};

export async function addNewCategory(_prevState: State, formData: FormData) {
  const validatedFields = addNewCategoryFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Por favor, preencha os campos corretamente.",
    };
  }

  const { name, description } = validatedFields.data;

  const validateUniqueName = await db.category.findUnique({
    where: {
      name,
    },
  });

  if (validateUniqueName) {
    return {
      errors: {
        name: ["Nome de categoria já está em uso. Por favor, escolha outra."],
      },
      message: "Nome de categoria já está em uso. Por favor, escolha outra.",
    };
  }

  try {
    await db.category.create({
      data: {
        name,
        description,
      },
    });

    revalidatePath("/admin/categories");
    return {
      message: "Categoria criada com sucesso.",
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: "Erro ao criar a categoria. Por favor, tente novamente.",
        success: false,
      };
    }
    throw error;
  }
}
