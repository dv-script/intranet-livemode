import { Button } from "@/app/_components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/app/_components/ui/popover";
import { Ellipsis } from "lucide-react";
import { DeleteIntranetDialog } from "./_delete-intranet/delete-intranet-dialog";
import { EditIntranetDialog } from "./_edit-intranet/edit-intranet-dialog";
import { Category, Prisma } from "@prisma/client";

export function IntranetAdminResources({
  intranet,
  categories,
}: {
  categories: Category[];
  intranet: Prisma.IntranetGetPayload<{ include: { category: true } }>;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon-xs">
          <Ellipsis size={12} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="flex gap-3 items-center">
          <EditIntranetDialog categories={categories} intranet={intranet} />
          <DeleteIntranetDialog intranet={intranet} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
