"use server";

import { z } from "zod";
import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";
import { Role, Status } from "@prisma/client";

const editUserSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3, { message: "Nome precisa ter no mínimo 3 caracteres" }),
  email: z.string().email({ message: "O e-mail não é válido" }),
  status: z
    .string({ message: "É necessário selecionar um status" })
    .regex(/^(ACTIVE|INACTIVE)$/, { message: "Status inválido" }),
  role: z
    .string({ message: "É necessário selecionar um cargo" })
    .regex(/^(ADMIN|USER)$/, { message: "Cargo inválido" }),
});

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    status?: string[];
    role?: string[];
  };
  message: string;
  success?: boolean;
};

export async function editUser(_prevState: State, formData: FormData) {
  const validatedFields = editUserSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    email: formData.get("email"),
    status: formData.get("status"),
    role: formData.get("role"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Por favor, preencha os campos corretamente.",
    };
  }

  const { id, name, email, role, status } = validatedFields.data;

  try {
    await db.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        role: role as Role,
        status: status as Status,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/admin/users");
    return {
      message: "Usuário atualizado com sucesso.",
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: "Erro ao atualizar o usuário. Por favor, tente novamente.",
        success: false,
      };
    }
    throw error;
  }
}
