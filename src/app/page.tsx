import Link from "next/link";
import { Button } from "./_components/ui/button";
import { RequestAccountForm } from "./_components/request-account-form";

export default function Page() {
  return (
    <div className="px-4 py-12 flex flex-col gap-12 max-w-screen-xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-8 text-center">
          <h1 className="font-extrabold text-gradient text-5xl md:text-6xl">
            A Intranet da Livemode
          </h1>
          <div className="w-full md:w-1/2 mx-auto">
            <p className="text-muted-foreground">
              A Intranet da Livemode é um espaço para você poder{" "}
              <strong className="text-white">localizar</strong> todos os links
              de configuração de broadcast.
            </p>
          </div>
        </div>
        <div className="flex gap-4 mx-auto">
          <Button asChild className="font-semibold text-zinc-800">
            <Link href="/auth/sign-in">Começar</Link>
          </Button>
          <Button variant="outline">Saiba mais</Button>
        </div>
      </div>
      <RequestAccountForm />
    </div>
  );
}
