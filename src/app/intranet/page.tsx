import { db } from "../_lib/prisma";
import { auth } from "../auth/providers";
import { IntranetList } from "./_components/intranet-list";
import { Search } from "./_components/search";

export default async function Page() {
  const session = await auth();

  const intranets = await db.intranet.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const intranetsFavorited = await db.userWhoFavoritedIntranet.findMany({
    where: { userId: session?.user!.id },
    include: {
      intranet: true,
    },
  });

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <div className="flex flex-col px-4 max-w-screen-xl mx-auto">
      <div className="pt-4">
        <Search />
      </div>
      <div className="pt-4">
        <IntranetList
          intranetsFavorited={intranetsFavorited}
          isAdmin={isAdmin}
          intranets={intranets}
        />
      </div>
    </div>
  );
}
