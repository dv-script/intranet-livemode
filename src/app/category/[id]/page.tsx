import { Loading } from "@/app/_components/loading";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { auth } from "@/app/auth/providers";
import { IntranetItem } from "@/app/intranet/_components/intranet-item";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
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

  const category = categories.find((category) => category.id === id);

  const intranetsFavorited = await db.userWhoFavoritedIntranet.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      intranet: true,
    },
  });

  if (!category) {
    return notFound();
  }

  if (category?.intranets.length === 0) {
    return (
      <div className="flex flex-col gap-6 px-4 py-12 max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-1">
          <h1 className="font-extrabold text-gradient text-5xl md:text-6xl">
            Não há intranet em {category?.name}
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
    <div className="px-4 py-12 flex flex-col gap-12 max-w-screen-xl mx-auto">
      <h1 className="font-extrabold text-gradient text-5xl md:text-6xl">
        {category?.name}
      </h1>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<Loading />}>
          {category?.intranets.map((intranet) => (
            <IntranetItem
              key={intranet.id}
              intranet={intranet}
              intranetsFavorited={intranetsFavorited}
              categories={categories}
              isAdmin={session?.user?.role === "ADMIN"}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
