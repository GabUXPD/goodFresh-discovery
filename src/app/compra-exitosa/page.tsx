"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShareIcon } from "@/components/icons";
import { useCart } from "@/context/CartContext";

// Contenido y estructura verificados contra el nodo de Figma "Compra exitosa"
// (node-id 527-7681, archivo "Nuevos negocios").

// Cashback fijo por caja comprada; si la compra no viene de una caja (solo
// productos sueltos de "elige producto a producto"), se gana $20 por cada
// producto agregado al carro.
const BOX_CASHBACK: Record<string, number> = {
  "caja-ensaladas": 550,
  "caja-frutas": 500,
  "caja-completa": 1750,
};
const STANDALONE_CASHBACK_PER_ITEM = 20;
const PREVIOUS_ACCUMULATED_CASHBACK = 1450;

function formatPrice(value: number) {
  return `$${new Intl.NumberFormat("es-CL").format(value)}`;
}

export default function CompraExitosaPage() {
  const cart = useCart();
  const router = useRouter();
  const purchaseCashback = cart.activeBoxId
    ? (BOX_CASHBACK[cart.activeBoxId] ?? 0)
    : cart.items.length * STANDALONE_CASHBACK_PER_ITEM;
  const totalAccumulated = PREVIOUS_ACCUMULATED_CASHBACK + purchaseCashback;

  useEffect(() => {
    cart.saveLastOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSeguirComprando() {
    cart.setItems([]);
    cart.setActiveBoxId(null);
    router.push("/");
  }

  return (
    <main className="flex flex-1 flex-col bg-[#f4f0ed] px-4 pt-8 pb-9">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-center text-[28px] leading-tight font-black">
          <span className="text-[#fa26a3]">¡Gracias </span>
          <br />
          <span className="text-[#232321]">por tu compra!</span>
        </h1>

        <div className="relative h-[265px] w-[270px]">
          <Image src="/images/mascota-mandarina.png" alt="Mandarina magnífica" fill className="object-contain" />
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-4">
        <p className="text-center text-xl font-extrabold text-[#232321]">
          ¡Se cargarán los créditos al confirmar la orden!
        </p>

        <div className="flex w-full gap-2">
          <div className="relative flex flex-1 flex-col items-start justify-center gap-1 overflow-hidden rounded-xl bg-[#feedb8] p-2 shadow-[2px_2px_6px_rgba(0,0,0,0.04)]">
            <p className="text-xs font-medium text-[#232321]">Con la compra ganaste</p>
            <p className="text-xl font-extrabold text-[#232321]">{formatPrice(purchaseCashback)}</p>
            <p className="text-xs font-medium text-[#232321]">Cashback</p>
            <div className="absolute right-1 bottom-1 h-9 w-9">
              <Image src="/images/coin-cashback.png" alt="" fill className="object-contain" />
            </div>
          </div>
          <div className="relative flex flex-1 flex-col items-start justify-center gap-1 overflow-hidden rounded-xl bg-[#ffd755] p-2 shadow-[2px_2px_6px_rgba(0,0,0,0.04)]">
            <p className="text-xs font-medium text-[#232321]">Total acumulado</p>
            <p className="text-xl font-extrabold text-[#232321]">{formatPrice(totalAccumulated)}</p>
            <p className="text-xs font-medium text-[#232321]">Cashback</p>
            <div className="absolute right-1 bottom-1 h-9 w-9">
              <Image src="/images/coin-co2.png" alt="" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#f6279f] px-4 py-3"
        >
          <ShareIcon className="h-6 w-6 text-white" />
          <span className="text-sm font-medium text-white">Comparte tus logros con tus amig@s</span>
        </button>
        <p className="py-3 text-sm font-extrabold text-[#232321] underline">Ir a mi orden</p>
        <button
          type="button"
          onClick={handleSeguirComprando}
          className="flex w-full items-center justify-center rounded-full border border-brand px-4 py-2.5 text-[14px] leading-[1.5] font-medium text-brand"
        >
          Seguir comprando
        </button>
      </div>
    </main>
  );
}
