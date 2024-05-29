import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { AddNewUserDialog } from "./_components/add-new-user-dialog";

export default function Page() {
  return (
    <div className="px-4 py-12 flex flex-col gap-12 max-w-screen-xl mx-auto">
      <div className="flex flex-col gap-3">
        <AddNewUserDialog />
        <div className="flex gap-2">
          <Input placeholder="Buscar por usuário..." />
          <Button>Buscar</Button>
        </div>
      </div>
    </div>
  );
}
