"use server";

import { z } from "zod";
import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";

const deleteRequestedAccountFormSchema = z.object({
  id: z.string(),
});

export type State = {
  errors?: {
    id?: string[];
  };
  message: string;
  success?: boolean;
};

export async function deleteRequestedAccount(
  _prevState: State,
  formData: FormData
) {
  const validatedFields = deleteRequestedAccountFormSchema.safeParse({
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
    await db.requestedAccount.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/users");
    return {
      message: "Conta solicitada deletada com sucesso.",
      success: true,
    };
  } catch (error) {
    return {
      message: "Erro ao deletar a conta solicitada.",
      success: false,
    };
  }
}
