import { AddNewUserDialog } from "./_components/add-new-user-dialog";
import { db } from "@/app/_lib/prisma";
import { UsersTable } from "./_components/users-table";

export default async function Page() {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return (
    <div className="px-4 py-3 flex flex-col max-w-screen-xl mx-auto">
      <AddNewUserDialog />
      <UsersTable usersData={users} />
    </div>
  );
}
