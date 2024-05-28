"use client";

import { searchForIntranets } from "@/app/_actions/search-for-intranets";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { Loading } from "@/app/_components/loading";
import { IntranetItem } from "../../_components/intranet-item";

export function OptionsList({
  isAdmin,
  intranetsFavorited,
  categories,
}: {
  isAdmin: boolean;
  intranetsFavorited: Prisma.UserWhoFavoritedIntranetGetPayload<{
    include: { intranet: true };
  }>[];
  categories: Prisma.CategoryGetPayload<{ include: { intranets: true } }>[];
}) {
  const searchParams = useSearchParams();
  const [options, setOptions] = useState<
    Prisma.IntranetGetPayload<{ include: { category: true } }>[]
  >([]);
  const [loading, setLoading] = useState(true);
  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchOptions = async () => {
      if (!searchFor) return;
      const foundOptions = await searchForIntranets(searchFor);
      setOptions(foundOptions);
      setLoading(false);
    };

    fetchOptions();
  }, [searchFor]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 max-w-screen-xl mx-auto">
        <Loading />
      </div>
    );
  }

  if (options.length === 0) {
    return (
      <div className="flex flex-col gap-6 px-4 py-12 max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-1">
          <h1 className="font-extrabold text-gradient text-5xl md:text-6xl">
            Nenhum intranet foi encontrado
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
        Resultados da busca:
      </h1>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <IntranetItem
            key={option.id}
            intranet={option}
            categories={categories}
            isAdmin={isAdmin}
            intranetsFavorited={intranetsFavorited}
          />
        ))}
      </div>
    </div>
  );
}
