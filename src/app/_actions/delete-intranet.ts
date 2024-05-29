"use server";

import { z } from "zod";
import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";

const deleteIntranetFormSchema = z.object({
  id: z.string(),
});

export type State = {
  errors?: {
    id?: string[];
  };
  message: string;
  success?: boolean;
};

export async function deleteIntranet(_prevState: State, formData: FormData) {
  const validatedFields = deleteIntranetFormSchema.safeParse({
    id: formData.get("id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Por favor, preencha os campos corretamente.",
    };
  }

  const { id } = validatedFields.data;

  try {
    await db.intranet.delete({
      where: {
        id,
      },
    });

    revalidatePath("/intranet");
    return {
      message: "Intranet deletada com sucesso.",
      success: true,
    };
  } catch (error) {
    return {
      message: "Erro ao deletar intranet.",
      success: false,
    };
  }
}
