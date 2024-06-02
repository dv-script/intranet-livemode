import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import {
  HeartIcon,
  HomeIcon,
  Layers2,
  LogInIcon,
  MenuIcon,
  Shield,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { db } from "../_lib/prisma";
import { SignOutDialog } from "./sign-out-dialog";
import { auth } from "../auth/providers";
import { Avatar, AvatarFallback } from "./ui/avatar";

export async function Header() {
  const categories = await db.category.findMany({
    select: {
      name: true,
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const session = await auth();

  return (
    <div className="mx-auto flex items-center gap-2 justify-between p-2 max-w-screen-xl">
      <Link href="/" className="relative h-16 w-16">
        <Image src="/logo.png" alt="CazeTV Logo" fill priority quality={100} sizes="100%" />
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2 pt-6">
            {session ? (
              <div className="flex gap-2 items-center pb-4">
                <Avatar>
                  <AvatarFallback>{session.user?.name![0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h2 className="font-semibold">{session.user?.name}</h2>
                  <span className="text-xs text-muted-foreground">
                    {session.user?.email}
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center gap-2">
                  <h2 className="font-semibold">Olá. Faça seu login!</h2>
                  <SheetClose asChild>
                    <Button asChild size="icon-xs">
                      <Link href="/auth/sign-in">
                        <LogInIcon size={14} />
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
                <div className="py-3">
                  <Separator />
                </div>
              </>
            )}
            <div className="flex flex-col gap-2">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 items-center rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/">
                    <HomeIcon size={16} />
                    <span className="block">Ínicio</span>
                  </Link>
                </Button>
              </SheetClose>
              {session?.user?.role === "ADMIN" && (
                <SheetClose asChild>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start gap-3 items-center rounded-full text-sm font-normal"
                  >
                    <Link href="/admin">
                      <Shield size={16} />
                      <span className="block">Admin</span>
                    </Link>
                  </Button>
                </SheetClose>
              )}
              {session && (
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 items-center rounded-full text-sm font-normal"
                    asChild
                  >
                    <Link href="my-favorites-intranets">
                      <HeartIcon size={16} />
                      <span className="block">Intranets Favoritos</span>
                    </Link>
                  </Button>
                </SheetClose>
              )}
            </div>
            {session && (
              <>
                <div className="py-3">
                  <Separator />
                </div>
                <div className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <Button
                      asChild
                      key={category.id}
                      variant="ghost"
                      className="w-full justify-start gap-3 items-center rounded-full text-sm font-normal"
                    >
                      <Link href={`/category/${category.id}`}>
                        <Layers2 />
                        <span>{category.name}</span>
                      </Link>
                    </Button>
                  ))}
                </div>

                <div className="py-3">
                  <Separator />
                </div>
                <SignOutDialog />
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
