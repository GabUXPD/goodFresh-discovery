"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "./icons";
import { useCart } from "@/context/CartContext";

// Contenido y estructura verificados contra el nodo de Figma "repite tu pedido"
// (node-id 554-5094, archivo "Nuevos negocios").

export function RepeatOrderBanner() {
  const cart = useCart();
  const router = useRouter();

  if (!cart.lastOrder || cart.lastOrder.length === 0) return null;

  function handleClick() {
    cart.repeatLastOrder();
    router.push("/carro");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-full items-center justify-between rounded-2xl bg-aqua-3 px-4 py-2"
    >
      <div className="flex items-center gap-2">
        <div className="shrink-0 overflow-hidden rounded-lg">
          <Image src="/images/cajaVerduras.png" alt="" width={486} height={389} className="h-[39px] w-auto" />
        </div>
        <div className="flex flex-col items-start">
          <p className="text-[16px] font-bold text-ink-9">Repite tu compra</p>
          <p className="text-[14px] text-ink-9" style={{ lineHeight: 1.7 }}>
            Ahorra tiempo
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-0.5 rounded-full border border-ink-4 py-1 pr-2 pl-2.5">
        <span className="text-[14px] text-ink-8" style={{ lineHeight: 1.7 }}>
          Revisar pedido
        </span>
        <ChevronRightIcon className="h-[18px] w-[18px] text-ink-8" />
      </div>
    </button>
  );
}
