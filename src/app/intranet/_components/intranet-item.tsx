import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { IntranetAdminResources } from "./intranet-admin-resources";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Category, Prisma } from "@prisma/client";
import { InfoIcon, Link2 } from "lucide-react";
import Link from "next/link";
import { FavoriteIntranet } from "./favorite-intranet";

export function IntranetItem({
  intranet,
  isAdmin,
  categories,
  intranetsFavorited,
}: {
  intranetsFavorited?: Prisma.UserWhoFavoritedIntranetGetPayload<{
    include: { intranet: true };
  }>[];
  categories: Category[];
  isAdmin: boolean;
  intranet: Prisma.IntranetGetPayload<{ include: { category: true } }>;
}) {
  return (
    <div className="flex flex-col gap-3 p-8 rounded-lg border ">
      <div className="flex justify-between gap-3">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <span className="font-semibold">{intranet.name}</span>
            {intranet.description && (
              <Popover>
                <PopoverTrigger>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex flex-col items-center"
                    asChild
                  >
                    <InfoIcon className="w-3 h-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="right">
                  {intranet.description}
                </PopoverContent>
              </Popover>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500">{intranet.link}</span>
            <Button variant="ghost" size="icon-xs" asChild>
              <Link href={intranet.link} target="_blank">
                <Link2 size={12} />
              </Link>
            </Button>
          </div>
        </div>
        {intranetsFavorited && (
          <FavoriteIntranet
            intranet={intranet}
            intranetsFavorited={intranetsFavorited}
          />
        )}
      </div>
      <Badge className="w-fit">
        <Link href={`/category/${intranet.category.id}`}>
          {intranet.category.name}
        </Link>
      </Badge>

      {isAdmin && (
        <div className="flex justify-end">
          <IntranetAdminResources categories={categories} intranet={intranet} />
        </div>
      )}
    </div>
  );
}
