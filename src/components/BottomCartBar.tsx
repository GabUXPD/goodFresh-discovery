"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

// Estado activo verificado contra el nodo de Figma "Button Navigation Bar"
// (node-id 554-5488, archivo "Nuevos negocios").

function formatPrice(value: number) {
  return `$ ${new Intl.NumberFormat("es-CL").format(value)}`;
}

export function BottomCartBar() {
  const cart = useCart();
  const router = useRouter();
  const hasItems = cart.items.length > 0;

  return (
    <>
      <div className="h-[76px] shrink-0" />
      <div className="fixed inset-x-0 bottom-0 z-10 mx-auto w-full max-w-[430px] bg-white/95 pt-3 backdrop-blur">
        {hasItems ? (
          <button
            type="button"
            onClick={() => router.push("/carro")}
            className="flex h-16 w-full items-center justify-between rounded-full bg-brand px-8 py-5 text-base shadow-sm"
          >
            <span className="font-medium text-brand-1">Ver el carrito ({cart.items.length})</span>
            <span className="font-semibold text-brand-1">{formatPrice(cart.total)}</span>
          </button>
        ) : (
          <div className="flex h-16 w-full items-center justify-center rounded-full bg-neutro-4 text-base font-medium text-neutro-8">
            Aún no haces tu pedido
          </div>
        )}
      </div>
    </>
  );
}
