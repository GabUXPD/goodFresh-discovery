"use client";

import { useRouter } from "next/navigation";
import { CartIcon } from "./icons";
import { useCart } from "@/context/CartContext";

// Estado con badge verificado contra el nodo de Figma "Icono" (node-id 559-4501).

export function HeaderCartButton() {
  const cart = useCart();
  const router = useRouter();
  const count = cart.items.length;

  return (
    <button
      type="button"
      aria-label="Carrito"
      onClick={() => router.push("/carro")}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink-9 shadow-sm"
    >
      <CartIcon className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute top-[-1px] right-[2px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#fa26a3] px-1 text-[9px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}
