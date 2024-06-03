import { AddNewUserDialog } from "./_components/add-new-user-dialog";
import { db } from "@/app/_lib/prisma";
import { UsersTable } from "./_components/users-table";
import { RequestedAccountTable } from "./_components/requested-account-table";
import { Separator } from "@/app/_components/ui/separator";

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
      isNewUser: true,
    },
  });

  const requestedAccounts = await db.requestedAccount.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="px-4 py-3 flex flex-col gap-5 max-w-screen-xl mx-auto">
      <div className="flex flex-col">
        <AddNewUserDialog />
        <UsersTable usersData={users} />
      </div>
      <Separator />
      <div className="flex flex-col">
        <RequestedAccountTable requestAccountData={requestedAccounts} />
      </div>
    </div>
  );
}
