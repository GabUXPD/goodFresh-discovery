"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShareIcon } from "@/components/icons";
import { useCart } from "@/context/CartContext";

// Contenido y estructura verificados contra el nodo de Figma "Compra exitosa"
// (node-id 527-7681, archivo "Nuevos negocios"). Las cards de ahorro siguen
// el node-id 737-10829.
const JUMBO_MARKUP = 0.3;
const LIDER_MARKUP = 0.24;
// No existe backend/historial de compras real en este prototipo: esta base
// representa el ahorro acumulado de compras anteriores, sobre el que se suma
// el ahorro de la compra recién realizada.
const ACCUMULATED_SAVINGS_BASE = 118450;

function formatPrice(value: number) {
  return `$${new Intl.NumberFormat("es-CL").format(value)}`;
}

export default function CompraExitosaPage() {
  const cart = useCart();
  const router = useRouter();

  useEffect(() => {
    cart.saveLastOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const purchaseTotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const jumboPrice = Math.round(purchaseTotal * (1 + JUMBO_MARKUP));
  const liderPrice = Math.round(purchaseTotal * (1 + LIDER_MARKUP));
  const purchaseSavings = Math.max(jumboPrice, liderPrice) - purchaseTotal;
  const accumulatedSavings = ACCUMULATED_SAVINGS_BASE + purchaseSavings;

  function handleSeguirComprando() {
    cart.setItems([]);
    cart.setActiveBoxId(null);
    router.push("/tienda-goodfresh");
  }

  return (
    <main className="flex flex-1 flex-col items-center bg-[#f4f0ed]">
      <div className="flex w-full flex-col items-center gap-6 px-4 pt-8">
        <h1 className="text-center text-[28px] leading-tight font-black">
          <span className="text-[#fa26a3]">¡Gracias </span>
          <br />
          <span className="text-[#232321]">por tu compra!</span>
        </h1>

        <div className="relative h-[279px] w-[350px]">
          <Image src="/images/scooter-delivery.png" alt="Repartidor en scooter con productos frescos" fill className="object-contain" />
        </div>
      </div>

      <div className="flex w-full flex-1 flex-col items-center justify-start gap-8 rounded-t-[75px] bg-white px-4 pt-[16px] pb-8">
      <div className="flex w-full flex-col items-center">
        <p className="text-center text-[20px] font-extrabold text-[#232321]">¡Tu pedido se está armando!</p>
        <div className="flex items-center gap-4">
          <p className="text-[14px] font-semibold whitespace-nowrap text-[#1a1e23]">Te llegará mañana entre las</p>
          <span className="flex items-center rounded-full bg-brand-1 px-2.5 text-[14px] font-semibold whitespace-nowrap text-brand">
            10:30 a 15:30
          </span>
        </div>
      </div>

      <div className="flex w-full items-start gap-2">
        <div className="relative flex flex-1 flex-col items-start gap-1 rounded-xl bg-[#ebfaf3] p-2 shadow-[2px_2px_6px_0px_rgba(0,0,0,0.04)]">
          <p className="text-[20px] font-extrabold text-[#232321]">{formatPrice(purchaseSavings)}</p>
          <p className="text-[12px] font-medium text-[#232321]">Ahorraste en esta compra</p>
          <p className="text-[10px] whitespace-nowrap text-[#232321]">comparado con supermercados</p>
          <div className="absolute top-1 right-1 h-8 w-8">
            <Image src="/images/ahorro-compra-icono.png" alt="" fill className="object-contain" />
          </div>
        </div>
        <div className="relative flex flex-1 flex-col items-start gap-1 rounded-xl bg-[#f4f0ed] p-2 shadow-[2px_2px_6px_0px_rgba(0,0,0,0.04)]">
          <p className="text-[20px] font-extrabold text-[#232321]">{formatPrice(accumulatedSavings)}</p>
          <p className="text-[12px] font-medium text-[#232321]">Ahorro acumulado</p>
          <p className="text-[10px] whitespace-nowrap text-[#232321]">todas tus compras GoodFresh</p>
          <div className="absolute top-1 right-2 h-9 w-9">
            <Image src="/images/ahorro-acumulado-icono.png" alt="" fill className="object-contain" />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-4">
        <button
          type="button"
          className="tap-scale flex w-full items-center justify-center gap-2 rounded-lg bg-[#f6279f] px-4 py-3"
        >
          <ShareIcon className="h-6 w-6 text-white" />
          <span className="text-sm font-medium text-white">Recomienda GoodFresh a tus amigos</span>
        </button>
        <Link href="/mi-orden" className="text-sm font-extrabold text-[#232321] underline">
          Ir a mi orden
        </Link>
        <button
          type="button"
          onClick={handleSeguirComprando}
          className="tap-scale flex w-full items-center justify-center rounded-full border border-brand px-4 py-2.5 text-[16px] leading-[1.5] font-medium text-brand"
        >
          Seguir comprando
        </button>
      </div>
      </div>
    </main>
  );
}
