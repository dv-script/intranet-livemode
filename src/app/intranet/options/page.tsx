import { Suspense } from "react";
import { OptionsList } from "./_components/options-list";
import { auth } from "@/app/auth/providers";
import { db } from "@/app/_lib/prisma";

export default async function Page() {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";

  const categories = await db.category.findMany({
    include: {
      intranets: true,
    },
  });

  const intranetsFavorited = await db.userWhoFavoritedIntranet.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      intranet: true,
    },
  });

  return (
    <Suspense>
      <OptionsList
        isAdmin={isAdmin}
        intranetsFavorited={intranetsFavorited}
        categories={categories}
      />
    </Suspense>
  );
}
