"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShareIcon } from "@/components/icons";
import { useCart } from "@/context/CartContext";

// Contenido y estructura verificados contra el nodo de Figma "Compra exitosa"
// (node-id 527-7681, archivo "Nuevos negocios").

export default function CompraExitosaPage() {
  const cart = useCart();
  const router = useRouter();

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
    <main className="flex flex-1 flex-col items-center justify-center gap-8 bg-[#f4f0ed] px-4 py-8">
      <div className="flex w-full flex-col items-center gap-6">
        <h1 className="text-center text-[28px] leading-tight font-black">
          <span className="text-[#fa26a3]">¡Gracias </span>
          <br />
          <span className="text-[#232321]">por tu compra!</span>
        </h1>

        <div className="relative h-[279px] w-[350px]">
          <Image src="/images/scooter-delivery.png" alt="Repartidor en scooter con productos frescos" fill className="object-contain" />
        </div>
      </div>

      <div className="flex w-full flex-col items-center">
        <p className="text-center text-[20px] font-extrabold text-[#232321]">¡Tu pedido se está armando!</p>
        <div className="flex items-center gap-4">
          <p className="text-[14px] font-semibold whitespace-nowrap text-[#1a1e23]">Te llegará mañana entre las</p>
          <span className="flex items-center rounded-full bg-brand-1 px-2.5 text-[14px] font-semibold whitespace-nowrap text-brand">
            10:30 a 15:30
          </span>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#f6279f] px-4 py-3"
        >
          <ShareIcon className="h-6 w-6 text-white" />
          <span className="text-sm font-medium text-white">Comparte tus logros con tus amig@s</span>
        </button>
        <p className="text-sm font-extrabold text-[#232321] underline">Ir a mi orden</p>
        <button
          type="button"
          onClick={handleSeguirComprando}
          className="flex w-full items-center justify-center rounded-full border border-brand px-4 py-2.5 text-[16px] leading-[1.5] font-medium text-brand"
        >
          Seguir comprando
        </button>
      </div>
    </main>
  );
}
