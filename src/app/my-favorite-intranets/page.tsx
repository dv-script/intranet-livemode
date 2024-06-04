import { Suspense } from "react";
import { db } from "../_lib/prisma";
import { auth } from "../auth/providers";
import { IntranetItem } from "../intranet/_components/intranet-item";
import { Loading } from "../_components/loading";
import { Button } from "../_components/ui/button";
import Link from "next/link";

export default async function Page() {
  const session = await auth();

  const categories = await db.category.findMany({
    include: {
      intranets: {
        include: {
          category: true,
        },
      },
    },
  });

  const favoritedIntranets = await db.intranet.findMany({
    where: {
      UserWhoFavoritedIntranet: { some: { userId: session?.user?.id } },
    },
    include: {
      category: true,
      UserWhoFavoritedIntranet: true,
    },
    orderBy: { name: "asc" },
  });

  const intranetsFavorited = await db.userWhoFavoritedIntranet.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      intranet: true,
    },
  });

  if (favoritedIntranets.map((intranet) => intranet.id).length === 0) {
    return (
      <div className="flex flex-col gap-6 px-4 py-12 max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-1">
          <h1 className="font-extrabold text-gradient text-5xl md:text-6xl">
            Nenhum intranet foi favoritado
          </h1>
          <p className="text-sm">
            Volte para{" "}
            <strong className="font-bold text-white">página inicial</strong>. E
            tente novamente.
          </p>
        </div>
        <Button variant="outline" className="w-fit mx-auto" asChild>
          <Link href="/intranet">Voltar</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-12 max-w-screen-xl mx-auto">
      <h1 className="font-extrabold text-gradient text-5xl md:text-6xl">
        Meus favoritos
      </h1>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<Loading />}>
          {favoritedIntranets.map((intranet) => (
            <IntranetItem
              key={intranet.id}
              intranet={intranet}
              categories={categories}
              isAdmin={session?.user?.role === "ADMIN"}
              intranetsFavorited={intranetsFavorited}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
