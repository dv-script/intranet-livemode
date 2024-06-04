import { Button } from "@/app/_components/ui/button";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { formatDate } from "@/app/_utils/format-date";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent } from "@/app/_components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { EditCategoryDialog } from "../_edit-category/edit-category-dialog";
import { DeleteCategoryDialog } from "../_delete-category/delete-category-dialog";

export const categoriesTableColumns: ColumnDef<
  Prisma.CategoryGetPayload<{
    include: {
      intranets: true;
    };
  }>
>[] = [
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
    accessorKey: "description",
    header: () => {
      return <span>Descrição</span>;
    },
    cell: ({ row }) => {
      row.getValue("email");
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
      const category = row.original as Prisma.CategoryGetPayload<{
        include: {
          intranets: true;
        };
      }>;

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon-xs">
              <MoreHorizontal size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-1 flex flex-col gap-1">
            <EditCategoryDialog category={category} />
            <DeleteCategoryDialog category={category} />
          </PopoverContent>
        </Popover>
      );
    },
  },
];
