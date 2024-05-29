import Link from "next/link";
import { Button } from "../_components/ui/button";

export default function Page() {
  return (
    <div className="px-4 py-12 flex flex-col gap-12 max-w-screen-xl mx-auto">
      <div className="flex flex-col">
        <h1 className="font-extrabold text-gradient text-4xl sm:5xl md:text-6xl">
          Dashboard de Administrador
        </h1>
        <p className="text-muted-foreground text-sm">
          Aqui você pode <strong className="text-white">administrar</strong>{" "}
          todos os usuários e os links de configuração de broadcast.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" asChild>
          <Link href="/admin/users">Usuários</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/intranet">Intranets</Link>
        </Button>
      </div>
    </div>
  );
}
