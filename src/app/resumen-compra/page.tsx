"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckIcon, SwirlIcon } from "@/components/icons";
import { useCart } from "@/context/CartContext";
import { SAVED_ADDRESSES } from "@/data/addresses";

// Contenido y estructura verificados contra el nodo de Figma "Resumen de compra"
// (node-id 526-7146, archivo "Nuevos negocios").

const SHIPPING_COST = 2400;
const SERVICE_FEE = 140;
const DISCOUNT = 0;
const FREE_SHIPPING_THRESHOLD = 40000;
const REDIRECT_DELAY_MS = 3000;

// Nombre de caja para mostrar en "Productos comprados"; si la compra no viene
// de una caja (productos elegidos uno a uno), se muestra la cantidad de
// productos seleccionados en vez de un nombre de caja.
const BOX_NAMES: Record<string, string> = {
  "caja-ensaladas": "Caja verduras",
  "caja-frutas": "Caja frutas",
  "caja-completa": "Caja completa",
};

function formatPrice(value: number) {
  return `$${new Intl.NumberFormat("es-CL").format(value)}`;
}

export default function ResumenCompraPage() {
  const cart = useCart();
  const router = useRouter();
  const hasFreeShipping = cart.total >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = hasFreeShipping ? 0 : SHIPPING_COST;
  const total = cart.total + shippingCost + SERVICE_FEE - DISCOUNT;
  const boxName = cart.activeBoxId ? BOX_NAMES[cart.activeBoxId] : null;
  const productLabel = boxName ?? "Productos seleccionados";
  const productQuantity = boxName ? 1 : cart.items.length;
  const selectedAddress =
    SAVED_ADDRESSES.find((a) => a.id === cart.selectedAddressId) ?? SAVED_ADDRESSES[0];

  useEffect(() => {
    const timer = setTimeout(() => router.push("/compra-exitosa"), REDIRECT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex flex-1 flex-col bg-[#fffdfd] px-8 pt-8 pb-10">
      <h1 className="text-xl font-bold text-ink-9">Resumen de compra</h1>

      <div className="mt-4 flex flex-col gap-4">
        <div className="border-t border-dashed border-neutro-6" />

        <div className="flex gap-4">
          <CheckIcon className="h-6 w-6 shrink-0 text-brand" />
          <div className="flex flex-col">
            <p className="text-sm font-bold text-ink-9">GoodFresh</p>
            <p className="text-xs text-black">Vega central, Recoleta</p>
          </div>
        </div>

        <div className="flex gap-4 py-2">
          <CheckIcon className="h-6 w-6 shrink-0 text-brand" />
          <div className="flex flex-1 flex-col gap-0.5">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-ink-9">Delivery</span>
              <span className="rounded-2xl bg-brand-1 px-2.5 text-sm font-semibold text-brand">10:30 a 15:30</span>
            </div>
            <p className="text-xs text-black">{selectedAddress.address}</p>
          </div>
        </div>

        <div className="border-t border-dashed border-neutro-6" />

        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-ink-9">Productos comprados</span>
          <span className="text-xs font-medium text-neutro-8">
            {productQuantity} {productQuantity === 1 ? "producto" : "productos"}
          </span>
        </div>

        <div className="flex items-center gap-2 py-2">
          <CheckIcon className="h-6 w-6 shrink-0 text-brand" />
          <span className="w-[26px] text-center text-sm text-ink-9">{productQuantity}</span>
          <span className="flex-1 text-sm text-ink-9">{productLabel}</span>
          <span className="text-sm text-ink-9">{formatPrice(total)}</span>
        </div>

        <div className="border-t border-dashed border-neutro-6" />
      </div>

      <div className="flex-1" />

      <div className="flex flex-col items-center gap-4">
        <SwirlIcon className="h-[53px] w-[52px] animate-spin" />
        <p className="text-center text-sm font-medium text-brand">Estamos procesando tu compra</p>
      </div>

      <p className="mt-12 text-center text-sm font-semibold text-neutro-8 underline">Cancelar compra</p>
    </main>
  );
}
