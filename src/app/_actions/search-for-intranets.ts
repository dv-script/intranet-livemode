"use server";

import { db } from "@/app/_lib/prisma";

export async function searchForIntranets(search: string) {
  const intranets = await db.intranet.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });

  return intranets;
}
