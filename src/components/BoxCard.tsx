import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "./icons";

export type Box = {
  name: string;
  image: string;
  price: string;
  itemCount: string;
  cashback?: string;
  href?: string;
};

export function BoxCard({ box }: { box: Box }) {
  const armarClassName =
    "flex shrink-0 items-center gap-1 rounded-full border border-brand py-1.5 pr-2 pl-3.5 text-xs font-medium text-brand";

  const content = (
    <>
      <div className="relative aspect-[243/63.39] w-full overflow-hidden rounded-t-[8px]">
        <Image src={box.image} alt={box.name} fill sizes="243px" className="object-cover" />
      </div>
      <div className="flex flex-col gap-1 px-3">
        <div className="flex items-start justify-between gap-2 pt-2">
          <h3 className="truncate text-xs font-bold text-ink-9">{box.name}</h3>
          {box.cashback && (
            <span className="shrink-0 rounded-full bg-[#ffd755] px-1 py-0.5 text-[10px] text-black">
              {box.cashback} cashback
            </span>
          )}
        </div>
        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-medium text-ink-4">Desde:</span>
              <span className="text-sm font-black text-ink-9">{box.price}</span>
            </div>
            <span className="text-[10px] text-ink-3">{box.itemCount}</span>
          </div>
          <span className={armarClassName}>
            Armar
            <ChevronRightIcon className="h-[18px] w-[18px]" />
          </span>
        </div>
      </div>
    </>
  );

  const cardClassName = "w-[243px] shrink-0 overflow-hidden rounded-card bg-white pb-3 shadow-sm";

  return box.href ? (
    <Link href={box.href} className={cardClassName}>
      {content}
    </Link>
  ) : (
    <div className={cardClassName}>{content}</div>
  );
}
