import Link from "next/link";
import { Button } from "../_components/ui/button";

export default function Page() {
  return (
    <div className="px-4 py-12 flex flex-col gap-6 max-w-screen-xl mx-auto">
      <div className="flex flex-col">
        <h1 className="font-extrabold text-gradient py-2 text-4xl sm:5xl md:text-6xl">
          Configurações
        </h1>
        <p className="text-muted-foreground text-sm">
          Aqui você pode <strong className="text-white">configurar</strong> os
          detalhes da sua conta.
        </p>
      </div>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/settings/change-your-password">Trocar sua senha</Link>
        </Button>
        <Button variant="outline">
          <Link href="/settings/account-config">Configurações da conta</Link>
        </Button>
      </div>
    </div>
  );
}
