import { ChevronDownIcon, SearchIcon, HouseIcon, CakeIcon, BowlIcon, BreadIcon, PizzaSliceIcon, StorefrontIcon, PackageIcon, SmileIcon } from "@/components/icons";
import Image from "next/image";

const STATIC_CATEGORIES = [
  { label: "Antojos y Snacks", icon: CakeIcon },
  { label: "Almuerzos", icon: BowlIcon },
  { label: "Panadería", icon: BreadIcon },
  { label: "Pizzas", icon: PizzaSliceIcon },
] as const;

export default function GoodMealHomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="flex flex-col gap-4 px-4 pt-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-brand-1 px-3 py-1.5">
            <HouseIcon className="h-4 w-4 text-brand" />
            <span className="text-sm font-semibold text-brand">Casa</span>
          </div>
          <span className="text-sm text-ink-4">Av. Los Leones 50</span>
          <ChevronDownIcon className="h-4 w-4 text-ink-4" />
        </div>

        <div className="flex items-center gap-2 rounded-2xl bg-neutro-3 px-4 py-3">
          <span className="flex-1 text-sm text-neutro-8">¿Qué quieres comer?</span>
          <SearchIcon className="h-5 w-5 text-ink-9" />
        </div>

        <div className="flex items-start gap-5 overflow-x-auto pb-2">
          <div className="flex flex-col items-center gap-1.5">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-1">
              <Image src="/images/goodFresh-logo.png" alt="" width={32} height={32} className="object-contain" />
              <span className="absolute -top-1.5 right-0 rounded-full bg-brand px-1.5 py-0.5 text-[9px] font-bold text-white">Nuevo</span>
            </div>
            <span className="text-center text-xs font-medium text-ink-9">GoodFresh</span>
          </div>

          {STATIC_CATEGORIES.map(({ label, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutro-3">
                <Icon className="h-6 w-6 text-ink-9" />
              </div>
              <span className="w-16 text-center text-xs font-medium text-ink-9">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1" />

      <div className="h-[68px] shrink-0" />
      <div className="fixed inset-x-0 bottom-0 z-10 mx-auto flex w-full max-w-[430px] items-center justify-around border-t border-neutro-5 bg-white py-2">
        <div className="flex flex-col items-center gap-0.5 text-brand">
          <HouseIcon className="h-6 w-6" />
          <span className="text-[11px] font-semibold">Home</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-neutro-8">
          <StorefrontIcon className="h-6 w-6" />
          <span className="text-[11px] font-medium">Tiendas</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-neutro-8">
          <PackageIcon className="h-6 w-6" />
          <span className="text-[11px] font-medium">Órdenes</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-neutro-8">
          <SmileIcon className="h-6 w-6" />
          <span className="text-[11px] font-medium">Perfil</span>
        </div>
      </div>
    </main>
  );
}
