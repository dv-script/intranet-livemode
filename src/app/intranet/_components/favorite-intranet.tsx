"use client";

import { toggleFavoriteIntranet } from "@/app/_actions/toggle-favorite-intranet";
import { Button } from "@/app/_components/ui/button";
import { Intranet, Prisma } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function FavoriteIntranet({
  intranet,
  intranetsFavorited,
}: {
  intranet: Intranet;
  intranetsFavorited: Prisma.UserWhoFavoritedIntranetGetPayload<{
    include: { intranet: true };
  }>[];
}) {
  const isFavorite = intranetsFavorited.some(
    (fav) => fav.intranetId === intranet.id
  );
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  const [pending, setPending] = useState(false);

  const handleFavoriteClick = async () => {
    setIsFavoriteState((prev) => !prev);
    setPending(true);
    try {
      await toggleFavoriteIntranet(intranet.id);
      toast.success(
        isFavorite
          ? `${intranet.name} foi removido dos favoritos.`
          : `${intranet.name} foi favoritado.`
      );
      setPending(false);
    } catch (error) {
      if (!isFavoriteState) {
        toast.error(`Erro ao favoritar ${intranet.name}.`);
      } else {
        toast.error(`Erro ao desfavoritar ${intranet.name}.`);
      }
      setPending(false);
    }
  };

  return (
    <Button
      size="icon-xs"
      variant="ghost"
      className={isFavoriteState ? "bg-red-500 hover:bg-red-700" : ""}
      onClick={handleFavoriteClick}
      disabled={pending}
    >
      <HeartIcon size={16} />
    </Button>
  );
}
