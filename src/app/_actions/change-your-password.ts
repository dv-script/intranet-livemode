"use server";

import { z } from "zod";
import { db } from "../_lib/prisma";
import bcrypt from "bcrypt";

const changeYourPasswordSchema = z.object({
  id: z.string(),
  currentPassword: z.string({ message: "É necessário informar a senha atual" }),
  newPassword: z
    .string({ message: "É necessário informar a nova senha" })
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/, {
      message:
        "A senha precisa conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um carácter especial",
    }),
  confirmNewPassword: z.string({
    message: "É necessário confirmar a nova senha",
  }),
});

export type State = {
  errors?: {
    currentPassword?: string[];
    newPassword?: string[];
    confirmNewPassword?: string[];
  };
  message: string;
  success?: boolean;
};

export async function changeYourPassword(
  _prevState: State,
  formData: FormData
) {
  const validatedFields = changeYourPasswordSchema.safeParse({
    id: formData.get("id"),
    currentPassword: formData.get("current-password"),
    newPassword: formData.get("new-password"),
    confirmNewPassword: formData.get("confirm-new-password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Por favor, preencha os campos corretamente.",
    };
  }

  const { id, currentPassword, newPassword, confirmNewPassword } =
    validatedFields.data;

  if (newPassword !== confirmNewPassword) {
    return {
      errors: {
        newPassword: ["As senhas não coincidem. Por favor, tente novamente."],
        confirmNewPassword: [
          "As senhas não coincidem. Por favor, tente novamente.",
        ],
      },
      message: "Por favor, preencha os campos corretamente.",
      success: false,
    };
  }

  const hashedPasswordFromDb = await db.user.findFirst({
    where: {
      id,
    },
    select: {
      password: true,
    },
  });

  const isValidPassword = await bcrypt.compare(
    currentPassword,
    hashedPasswordFromDb!.password
  );

  if (!isValidPassword) {
    return {
      errors: {
        currentPassword: ["Senha atual incorreta. Por favor, tente novamente."],
      },
      message: "Por favor, preencha os campos corretamente.",
      success: false,
    };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    await db.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      message: "Senha alterada com sucesso!",
      success: true,
    };
  } catch (error) {
    return {
      message:
        "Ocorreu um erro ao tentar alterar a senha. Por favor, tente novamente.",
      success: false,
    };
  }
}
