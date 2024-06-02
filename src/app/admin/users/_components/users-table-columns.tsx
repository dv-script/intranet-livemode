import { Button } from "@/app/_components/ui/button";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { formatDate } from "@/app/_utils/format-date";
import { Role, Status, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { DeleteUserDialog } from "./delete-user-dialog";
import { Popover, PopoverContent } from "@/app/_components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { EditUserDialog } from "./edit-user-dialog";

export const userTableColumns: ColumnDef<Omit<User, "password">>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <span>Nome</span>
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
      const name = row.getValue("name") as string;
      return <div className="capitalize whitespace-nowrap">{name}</div>;
    },
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
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <span>Cargo</span>
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
      const role = row.getValue("role") as Role;
      return <div className="capitalize">{role.toLowerCase()}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <span>Status</span>
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
      const colorMap = {
        ACTIVE: "bg-green-500",
        INACTIVE: "bg-red-500",
        SUSPENDED: "bg-yellow-500",
      };
      const status = row.getValue("status") as Status;
      return (
        <div className="flex gap-2 items-center">
          <span className={`w-1 h-1 rounded-full ${colorMap[status]}`}></span>
          <span className="capitalize">{status.toLowerCase()}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <span className="whitespace-nowrap">Criado em</span>
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
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <span className="whitespace-nowrap">Atualizado em</span>
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
      const updatedAtDate = row.getValue("updatedAt") as Date;

      return <div className="lowercase">{formatDate(updatedAtDate)}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,

    cell: ({ row }) => {
      const user = row.original as User;

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon-xs">
              <MoreHorizontal size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-1 flex flex-col gap-1">
            <EditUserDialog user={user} />
            <DeleteUserDialog user={user} />
          </PopoverContent>
        </Popover>
      );
    },
  },
];
