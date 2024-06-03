import { auth } from "@/app/auth/providers";
import { ChangeYourPasswordForm } from "./_components/change-your-password-form";
import { User } from "@prisma/client";

export default async function Page() {
  const session = await auth();
  const user = session!.user as Pick<
    User,
    "name" | "email" | "id" | "role" | "isNewUser"
  >;

  return (
    <div className="px-4 py-12 flex flex-col gap-6 max-w-screen-xl mx-auto">
      <div className="flex flex-col gap-8 max-w-screen-md mx-auto">
        <header className="flex items-center gap-2 justify-center text-center flex-col">
          <h2 className="font-extrabold text-gradient text-4xl sm:5xl md:text-6xl">
            Troque sua senha
          </h2>
          {user.isNewUser ? (
            <p className="text-muted-foreground text-sm">
              Você deve <strong className="text-white">alterar</strong> a senha
              da sua conta para poder continuar.
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">
              Aqui você pode <strong className="text-white">alterar</strong> a
              senha da sua conta.
            </p>
          )}
        </header>
        <ChangeYourPasswordForm user={user} />
      </div>
    </div>
  );
}
