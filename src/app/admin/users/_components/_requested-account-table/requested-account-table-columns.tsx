import { Button } from "@/app/_components/ui/button";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { formatDate } from "@/app/_utils/format-date";
import { RequestedAccount } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent } from "@/app/_components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { DeleteRequestedAccountDialog } from "../_delete-requested-account/delete-requested-account-dialog";

export const requestedAccountTableColumns: ColumnDef<RequestedAccount>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <span>E-mail</span>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown size={12} />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <span className="whitespace-nowrap">Solicitada em</span>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown size={12} />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const createdAtDate = row.getValue("createdAt") as Date;

      return <div className="lowercase">{formatDate(createdAtDate)}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,

    cell: ({ row }) => {
      const requestedAccount = row.original as RequestedAccount;

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon-xs">
              <MoreHorizontal size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-1 flex flex-col gap-1">
            <DeleteRequestedAccountDialog requestedAccount={requestedAccount} />
          </PopoverContent>
        </Popover>
      );
    },
  },
];
