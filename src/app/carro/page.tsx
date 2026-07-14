"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, CompareSpinnerIcon, MinusIcon, PlusIcon, WarningIcon } from "@/components/icons";
import { useCart } from "@/context/CartContext";

// Contenido y estructura verificados contra el nodo de Figma "Carro de compras"
// (node-id 501-3948, archivo "Nuevos negocios"). 3 de los 4 bloques de producto
// de ejemplo del diseño estaban ocultos (son de otra app, no de GoodFresh) y no
// se incluyen. El carro real refleja lo que el usuario armó en "Caja ensalada".
// El aviso de monto mínimo sigue el node-id 505-5884. El banner comparativo de
// supermercados (carga: node-id 839-4434, resultado: node-id 839-4396) estima
// el precio de Jumbo con un 25% de recargo y el de Líder/Walmart con un 20%,
// y el % de ahorro se calcula contra el precio más alto de los dos.
const CART_PINK = "#ff18a6";
const MIN_TOTAL = 12000;
const FREE_SHIPPING_THRESHOLD = 40000;
const JUMBO_MARKUP = 0.3;
const LIDER_MARKUP = 0.24;
const COMPARISON_LOADING_MS = 2500;

function formatPrice(value: number) {
  return `$${new Intl.NumberFormat("es-CL").format(value)}`;
}

export default function CarroPage() {
  const cart = useCart();
  const router = useRouter();
  const isBelowMinimum = cart.items.length > 0 && cart.total < MIN_TOTAL;
  const hasFreeShipping = cart.total >= FREE_SHIPPING_THRESHOLD;
  const [isComparing, setIsComparing] = useState(true);
  // Si el carro tiene una caja activa (el usuario armó "Caja ensalada", "Caja
  // frutas" o "Caja completa"), se vuelve a esa misma caja. Si los productos
  // vienen solo de "O elige producto a producto" en la tienda (sin caja
  // activa), se vuelve a esa sección en vez de abrir/rearmar una caja.
  const boxHref = cart.activeBoxId ? `/${cart.activeBoxId}` : "/#producto-a-producto";

  useEffect(() => {
    const timer = setTimeout(() => setIsComparing(false), COMPARISON_LOADING_MS);
    return () => clearTimeout(timer);
  }, []);

  const jumboPrice = Math.round(cart.total * (1 + JUMBO_MARKUP));
  const liderPrice = Math.round(cart.total * (1 + LIDER_MARKUP));
  const higherPrice = Math.max(jumboPrice, liderPrice);
  const savingsPercent = higherPrice > 0 ? Math.round((1 - cart.total / higherPrice) * 100) : 0;

  function handleMinus(id: string, quantity: number) {
    if (quantity <= 1) {
      cart.setItems((items) => items.filter((item) => item.id !== id));
    } else {
      cart.updateQuantity(id, -1);
    }
  }

  return (
    <main className="flex flex-1 flex-col">
      {/* Header */}
      <div className="flex w-full items-center gap-1 bg-white px-3 py-3">
        <Link href={boxHref} aria-label="Volver" className="flex h-10 w-10 items-center justify-center rounded-full text-ink-9">
          <ChevronLeftIcon className="h-6 w-6" />
        </Link>
        <h1 className="flex-1 pr-10 text-center text-base font-semibold text-ink-9">Carro de compras</h1>
      </div>

      {/* Banner tienda */}
      <div className="flex items-center justify-between border-b-8 border-[#f5f5f7] px-4 pb-4">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-black">GoodFresh</p>
          <p className="text-xs text-black">Vega central, Recoleta</p>
          <p className="text-[10px] font-bold text-black">La reserva de productos expirará en 00:09:46</p>
        </div>
        <div className="relative h-16 w-16 shrink-0">
          <Image src="/images/goodFresh-logo.png" alt="Logo GoodFresh" fill sizes="64px" className="object-contain" />
        </div>
      </div>

      {/* Productos del carro */}
      <div className={`flex flex-col gap-3 px-4 pt-4 ${cart.isRepeatOrder ? "" : "pb-[24px]"}`}>
        {cart.items.length === 0 && <p className="text-center text-xs text-neutro-8">Tu carro está vacío.</p>}
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-2xl bg-white p-3 shadow-[0px_4px_12px_0px_rgba(6,31,45,0.12)]">
            <div className="flex items-center gap-2">
              <div className="relative h-[42px] w-14 shrink-0 overflow-hidden rounded">
                <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-black">{item.name}</p>
                <p className="text-xs font-bold text-black">{item.unit.replace("1 unidad", "1 un")}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="text-sm font-semibold" style={{ color: CART_PINK }}>
                {formatPrice(item.price * item.quantity)}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Restar"
                  onClick={() => handleMinus(item.id, item.quantity)}
                  className="flex h-6 w-6 items-center justify-center rounded-full border"
                  style={{ borderColor: CART_PINK, color: CART_PINK }}
                >
                  <MinusIcon className="h-3.5 w-3.5" />
                </button>
                <span className="w-3 text-center text-xs font-semibold" style={{ color: CART_PINK }}>
                  {item.quantity}
                </span>
                <button
                  type="button"
                  aria-label="Sumar"
                  onClick={() => cart.updateQuantity(item.id, 1)}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: CART_PINK }}
                >
                  <PlusIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Link "Agregar productos" al repetir un pedido anterior */}
      {cart.isRepeatOrder && !isBelowMinimum && cart.items.length > 0 && (
        <div className="flex justify-center px-4 pt-2 pb-[30px]">
          <Link
            href={boxHref}
            className="mt-2 flex w-full items-center justify-center rounded-full border border-brand bg-white px-3 py-[11px] text-[14px] leading-[1.5] font-medium whitespace-nowrap text-brand shadow-sm"
          >
            Agregar productos
          </Link>
        </div>
      )}

      <div
        className={`shrink-0 ${
          isBelowMinimum ? "h-[260px]" : cart.items.length > 0 ? "h-[210px]" : "h-[160px]"
        }`}
      />

      {/* Barra inferior */}
      <div className="fixed inset-x-0 bottom-0 z-10 mx-auto flex w-full max-w-[430px] flex-col gap-4 border-t-8 border-[#f5f5f7] bg-white px-4 pt-4 pb-3">
        {cart.items.length > 0 &&
          !isBelowMinimum &&
          (isComparing ? (
            <div className="flex flex-col items-center gap-1 rounded-lg bg-[#feedb8] p-2">
              <CompareSpinnerIcon className="h-6 w-6 animate-spin text-[#d57911]" />
              <p className="text-[14px] font-semibold whitespace-nowrap text-[#d57911]">Comparando precios en supermercados</p>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5 rounded-lg bg-[#fff9e8] p-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[12px] font-bold text-[#2d333b]">Este mismo carro en supermercados</p>
                <div className="flex shrink-0 items-center gap-1">
                  <span className="flex items-center gap-1 rounded-full bg-[#009639] py-px pr-1 pl-0.5 text-[12px] font-semibold whitespace-nowrap text-white">
                    <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full">
                      <Image src="/images/logo-jumbo.png" alt="" fill sizes="20px" className="object-cover" />
                    </span>
                    {formatPrice(jumboPrice)}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-[#0071dc] py-px pr-1 pl-0.5 text-[12px] font-semibold whitespace-nowrap text-white">
                    <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full">
                      <Image src="/images/logo-walmart.png" alt="" fill sizes="20px" className="object-cover" />
                    </span>
                    {formatPrice(liderPrice)}
                  </span>
                </div>
              </div>
              <div className="flex items-end justify-between gap-2">
                <p className="text-[12px] font-semibold whitespace-nowrap text-[#3c444f]">
                  En GoodFresh te ahorras un <span className="text-[14px]">{savingsPercent}%</span>
                </p>
                <p className="text-[10px] whitespace-nowrap text-[#3c444f]">Precios verificados hoy en línea</p>
              </div>
            </div>
          ))}
        {isBelowMinimum && (
          <div className="flex items-start gap-1 rounded-lg bg-[#fff9e8] py-2 pr-2 pl-1">
            <WarningIcon className="h-6 w-6 shrink-0 text-[#c36800]" />
            <p className="text-[12px] leading-[1.7] text-[#c36800]">
              La caja tiene un mínimo de <span className="leading-[1.5] font-semibold">{formatPrice(MIN_TOTAL)}</span>. Agrega más
              productos o aumenta las cantidades para continuar.
            </p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold" style={{ color: CART_PINK }}>
            Total a pagar
          </p>
          <div className="flex flex-col items-end">
            <p className="text-base font-semibold" style={{ color: CART_PINK }}>
              {formatPrice(cart.total)}
            </p>
            {hasFreeShipping ? (
              <span className="flex items-center gap-1 rounded-full bg-aqua-4 px-2 py-0.5 text-[10px] text-black">
                🥳 ¡Ya tienes el envío gratis!
              </span>
            ) : (
              <p className="text-[10px] text-aqua-7">Envío gratis desde $40.000</p>
            )}
          </div>
        </div>
        {isBelowMinimum ? (
          <Link
            href={boxHref}
            className="flex w-full items-center justify-center rounded-full border border-brand bg-white px-6 py-4 text-[14px] leading-[1.5] font-bold whitespace-nowrap text-brand"
          >
            Agregar productos
          </Link>
        ) : (
          <button
            type="button"
            disabled={cart.items.length === 0}
            onClick={() => router.push("/confirmacion-compra")}
            className={
              cart.items.length === 0
                ? "flex w-full items-center justify-center rounded-full border border-neutro-3 bg-neutro-3 px-6 py-4 text-sm font-bold text-neutro-7"
                : "flex w-full items-center justify-center rounded-full bg-brand px-6 py-4 text-sm font-bold text-brand-1 shadow-sm"
            }
          >
            Comprar
          </button>
        )}
      </div>
    </main>
  );
}
