import Link from "next/link";
import { Card } from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";
import Image from "next/image";

export interface MenuProps {
  id: number;
  calories: number;
  gramation: number;
  description: string;
  menu_name: string;
}

export function MenuLoading(): JSX.Element {
  return (
    <Card className="flex h-[275px] max-h-[275px] w-[275px] max-w-[275px] flex-col justify-center bg-yellow-400 p-2">
      <div className="mb-1 flex items-center justify-between">
        <Skeleton className="h-[16px] w-[100px]" />
        <Skeleton className="h-[16px] w-[75px]" />
      </div>
      <div className="mb-4 text-left">
        <Skeleton className="h-[16px] w-[125px]" />
      </div>
      <div className="mb-8 flex flex-grow flex-col items-center justify-center">
        <div className="flex flex-row gap-2">
          <Skeleton className="h-[96px] w-[48px] rounded-3xl" />
          <Skeleton className="h-[96px] w-[48px] rounded-3xl" />
          <Skeleton className="h-[32px] w-[32px] rounded-full" />
        </div>
      </div>
      <div className="pb-4">
        <Skeleton className="h-[26px] w-full rounded-3xl" />
      </div>
    </Card>
  );
}

export function Menu(props: MenuProps): JSX.Element {
  return (
    <Card className="flex h-[325px] max-h-[325px] w-[325px] max-w-[325px] flex-col justify-between bg-yellow-400 p-4">
      <div className="flex flex-col items-center justify-center text-center font-bold">
        <p className="text-lg underline">{props.menu_name}</p>
      </div>
      <div className="my-1 flex flex-col items-center justify-center">
        <p className="text-md font-medium">Gramasi: {props.gramation}</p>
        <p>{props.description}</p>
      </div>
      <div className="flex items-center justify-center font-bold">
        <p className="rounded-md bg-accent-red p-1 text-lg text-white">
          {props.calories} kalori
        </p>
      </div>
      <Link
        href={"https://wa.me/6285811524164"}
        className="mt-4 flex items-center justify-center space-x-2 rounded-md bg-white p-2 font-bold text-green-900 hover:bg-green-900 hover:text-white"
      >
        <Image
          src="logo_wa_trans.svg"
          alt="WhatsApp Logo"
          width={40}
          height={40}
        />
        <p>Pesan Sekarang</p>
      </Link>
    </Card>
  );
}
