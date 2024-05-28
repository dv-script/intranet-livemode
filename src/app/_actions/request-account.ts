"use server";

import { z } from "zod";
import { db } from "../_lib/prisma";

const requestAccountSchema = z.object({
  email: z
    .string()
    .email({ message: "Digite um e-mail válido" })
    .regex(/@livemode.com/, {
      message: "E-mail deve ser do domínio @livemode.com",
    }),
});

export type State = {
  errors?: {
    email?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function requestAccount(_prevState: State, formData: FormData) {
  const validatedFields = requestAccountSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Por favor, preencha corretamente o campo de e-mail.",
    };
  }

  const { email } = validatedFields.data;

  const existingAccount = await db.requestedAccount.findUnique({
    where: { email },
  });

  if (existingAccount) {
    return {
      errors: { email: ["Este e-mail já foi solicitado"] },
      message: "Este e-mail já foi solicitado",
    };
  }

  try {
    await db.requestedAccount.create({
      data: {
        email,
      },
    });

    return {
      success: true,
      message: "Sua solicitação foi enviada com sucesso!",
    };
  } catch (error) {
    return {
      message: "Ocorreu um erro ao enviar sua solicitação. Tente novamente.",
    };
  }
}
