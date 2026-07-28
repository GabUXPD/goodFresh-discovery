"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@/components/icons";
import { useCart } from "@/context/CartContext";

// Contenido y estructura verificados contra el nodo de Figma "Orden pro
// despachar" (node-id 535-5299, archivo "Nuevos negocios"). El listado de
// productos, el envío y el total se calculan a partir del último pedido
// realizado (cart.lastOrder), no están hardcodeados.

const SHIPPING_COST = 2400;
const FREE_SHIPPING_THRESHOLD = 40000;

function formatPrice(value: number) {
  return `$${new Intl.NumberFormat("es-CL").format(value)}`;
}

function formatDate(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);
  return `${dd}/${mm}/${yy}`;
}

export default function MiOrdenPage() {
  const cart = useCart();
  const router = useRouter();
  const order = cart.lastOrder ?? [];
  const [orderNumber] = useState(() => Math.floor(100000 + Math.random() * 900000));

  const [today] = useState(() => new Date());
  const deliveryDate = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  const productsTotal = order.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasFreeShipping = productsTotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = order.length === 0 || hasFreeShipping ? 0 : SHIPPING_COST;
  const total = productsTotal + shippingCost;

  function handleVolver() {
    cart.setItems([]);
    cart.setActiveBoxId(null);
    router.push("/");
  }

  return (
    <main className="flex flex-1 flex-col bg-[#fefafc] px-4 pt-4 pb-8">
      <div className="relative flex items-center justify-center py-2">
        <button
          type="button"
          onClick={handleVolver}
          aria-label="Volver"
          className="absolute left-0 flex h-10 w-10 items-center justify-center text-ink-9"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-[18px] font-bold text-[#1f2937]">Detalle de la orden</h1>
      </div>

      <div className="relative mt-4 overflow-hidden rounded-2xl bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)]">
        <div className="absolute top-0 right-0 rounded-bl-2xl rounded-br-2xl bg-[#ff18a6] px-3 py-1 text-[12px] font-medium text-white">
          Por Despachar
        </div>

        <div className="flex flex-col gap-1 px-4 pt-9 pb-3">
          <p className="text-[18px] font-semibold text-[#323740]">GoodFresh</p>
          <p className="text-[12px] text-black">
            <span className="font-medium">Fecha de compra:</span> {formatDate(today)}
          </p>
          <p className="text-[12px] text-black">
            <span className="font-medium">Fecha de entrega:</span> {formatDate(deliveryDate)}
          </p>
          <div className="flex items-center gap-2 text-[12px] text-black">
            <span className="font-medium">Delivery:</span>
            <span className="flex items-center rounded-full bg-brand-1 px-2.5 text-[12px] font-medium text-brand">10:30 a 15:30</span>
          </div>
          <p className="text-[12px] text-black">
            <span className="font-medium">Nº de orden:</span> {orderNumber}
          </p>
        </div>

        <div className="border-t border-neutro-4" />

        <div className="flex flex-col gap-2 px-4 py-3">
          <p className="text-center text-[14px] font-semibold text-black">Productos</p>
          {order.length === 0 ? (
            <p className="text-center text-xs text-neutro-8">No encontramos productos de tu último pedido.</p>
          ) : (
            <div className="flex flex-col">
              {order.map((item) => (
                <div key={item.id} className="flex items-center gap-2 py-1">
                  <p className="w-[26px] text-[14px] text-[#1a1e23]" style={{ lineHeight: 1.2 }}>
                    {item.quantity}
                  </p>
                  <div className="flex flex-1 items-center justify-between gap-2">
                    <p className="text-[14px] text-[#1a1e23]" style={{ lineHeight: 1.2 }}>
                      {item.name} - {item.unit}
                    </p>
                    <p className="text-[14px] whitespace-nowrap text-[#1a1e23]" style={{ lineHeight: 1.2 }}>
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-neutro-4" />

        <div className="flex flex-col gap-2 px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-[14px] text-[#22262d]" style={{ lineHeight: 1.2 }}>
              Delivery
            </p>
            <p className="text-[14px] text-[#22262d]" style={{ lineHeight: 1.2 }}>
              {formatPrice(shippingCost)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold text-[#22262d]" style={{ lineHeight: 1.5 }}>
              Monto Total
            </p>
            <p className="text-[14px] font-semibold text-[#22262d]" style={{ lineHeight: 1.5 }}>
              {formatPrice(total)}
            </p>
          </div>
        </div>

        <div className="flex justify-end px-4 pb-4">
          <p className="cursor-pointer text-[12px] font-medium text-brand underline">Cancelar mi pedido</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-2 rounded-2xl bg-white px-2 py-4 shadow-[0px_1px_3px_-1px_rgba(0,0,0,0.15),0px_4px_6px_-1px_rgba(0,0,0,0.1)]">
        <p className="text-center text-[14px] font-semibold text-[#3c444f]">
          Devuelve la caja en tu próximo pedido: al repartidor o déjala en conserjería.
        </p>
        <div className="relative h-[176px] w-[241px]">
          <Image src="/images/recuerda-devolver-caja2.png" alt="Recuerda devolver tu caja" fill className="object-contain" />
        </div>
      </div>

      <p className="mt-8 cursor-pointer text-center text-[14px] font-semibold text-brand">Ayuda con mi pedido activo</p>
    </main>
  );
}
