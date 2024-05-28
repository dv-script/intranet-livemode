"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";
import { auth } from "../auth/providers";

export async function toggleFavoriteIntranet(intranetId: string) {
  const session = await auth();
  const userId = session?.user!.id;

  const isFavorite = await db.userWhoFavoritedIntranet.findFirst({
    where: {
      userId,
      intranetId,
    },
  });

  if (isFavorite) {
    try {
      await db.userWhoFavoritedIntranet.delete({
        where: {
          userId_intranetId: {
            userId: userId!,
            intranetId,
          },
        },
      });

      revalidatePath("/intranet");
      return;
    } catch (error) {
      throw new Error("Erro ao remover favorito.");
    }
  }

  try {
    await db.userWhoFavoritedIntranet.create({
      data: {
        userId: userId!,
        intranetId,
      },
    });
    revalidatePath("/");
    return;
  } catch (error) {
    throw new Error("Erro ao favoritar.");
  }
}
