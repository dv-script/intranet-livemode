import { db } from "@/app/_lib/prisma";
import { CategoriesTable } from "./_components/_categories-table/categories-table";
import { AddNewCategoryDialog } from "./_components/_add-new-category/add-new-category-dialog";

export default async function Page() {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      intranets: true,
    },
  });

  return (
    <div className="px-4 py-3 flex flex-col gap-5 max-w-screen-xl mx-auto">
      <div className="flex flex-col">
        <AddNewCategoryDialog />
        <CategoriesTable categoriesData={categories} />
      </div>
    </div>
  );
}
