"use server";

import { z } from "zod";
import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";

const addNewIntranetSchemaForm = z.object({
  name: z.string({ message: "O nome do intranet é obrigatório" }),
  link: z
    .string()
    .regex(/^(http|https):\/\/.+/, { message: "O link não é válido" }),
  description: z
    .string({ message: "A descrição precisa ser texto" })
    .optional()
    .nullable(),
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

export async function addNewIntranet(_prevState: State, formData: FormData) {
  const validatedFields = addNewIntranetSchemaForm.safeParse({
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

  const { name, link, description, category } = validatedFields.data;

  const validateUniqueName = await db.intranet.findUnique({
    where: {
      name,
    },
  });

  if (validateUniqueName) {
    return {
      errors: {
        name: ["Nome de Intranet já está em uso. Por favor, escolha outra."],
      },
      message: "Nome de Intranet já está em uso. Por favor, escolha outra.",
    };
  }

  const validateUniqueLink = await db.intranet.findUnique({
    where: {
      link,
    },
  });

  if (validateUniqueLink) {
    return {
      errors: {
        link: ["Link de Intranet já está em uso. Por favor escolha outra"],
      },
      message: "Link de Intranet já está em uso. Por favor escolha outra",
    };
  }

  try {
    await db.intranet.create({
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
      message: "Intranet criada com sucesso.",
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: "Erro ao criar a intranet. Por favor, tente novamente.",
        success: false,
      };
    }
    throw error;
  }
}
