"use server";

import { z } from "zod";
import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";

const editIntranetFormSchema = z.object({
  id: z.string(),
  name: z.string({ message: "O nome do intranet é obrigatório" }),
  link: z
    .string()
    .regex(/^(http|https):\/\/.+/, { message: "O link não é válido" }),
  description: z
    .string({ message: "A descrição precisa ser texto" })
    .optional(),
  category: z.string().refine((value) => !!value, {
    message: "Necessário selecionar uma categoria",
  }),
});

export type State = {
  errors?: {
    name?: string[];
    link?: string[];
    description?: string[];
    category?: string[];
  };
  message: string;
  success?: boolean;
};

export async function editIntranet(_prevState: State, formData: FormData) {
  const validatedFields = editIntranetFormSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    link: formData.get("link"),
    description: formData.get("description"),
    category: formData.get("category"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Por favor, preencha os campos corretamente.",
    };
  }

  const { id, name, link, description, category } = validatedFields.data;

  const validateUniqueName = await db.intranet.findFirst({
    where: {
      name,
    },
  });

  if (validateUniqueName && validateUniqueName.id !== id) {
    return {
      errors: {
        name: ["Nome de Intranet já está em uso. Por favor, escolha outra."],
      },
      message: "Nome de Intranet já está em uso. Por favor, escolha outra.",
    };
  }

  try {
    await db.intranet.update({
      where: {
        id,
      },
      data: {
        name,
        link,
        description,
        category: {
          connect: {
            name: category,
          },
        },
      },
    });

    revalidatePath("/intranet");
    return {
      message: "Intranet atualizada com sucesso.",
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: "Erro ao atualizar a intranet. Por favor, tente novamente.",
        success: false,
      };
    }
    throw error;
  }
}
