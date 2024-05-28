import { Prisma } from "@prisma/client";
import { IntranetItem } from "./intranet-item";
import { db } from "@/app/_lib/prisma";

export async function IntranetList({
  intranets,
  isAdmin,
  intranetsFavorited,
}: {
  intranetsFavorited: Prisma.UserWhoFavoritedIntranetGetPayload<{
    include: { intranet: true };
  }>[];
  isAdmin: boolean;
  intranets: Prisma.IntranetGetPayload<{ include: { category: true } }>[];
}) {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {intranets.map((intranet) => (
        <IntranetItem
          key={intranet.id}
          intranetsFavorited={intranetsFavorited}
          categories={categories}
          isAdmin={isAdmin}
          intranet={intranet}
        />
      ))}
    </div>
  );
}
