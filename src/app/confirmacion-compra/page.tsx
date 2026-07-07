"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CloseIcon,
  CoinIcon,
  CouponIcon,
  FavoriteBadgeIcon,
  InfoIcon,
  LocationTargetIcon,
  MoreVerticalIcon,
  SearchIcon,
  WalkingIcon,
} from "@/components/icons";
import { useCart } from "@/context/CartContext";
import { SAVED_ADDRESSES } from "@/data/addresses";

// Contenido y estructura verificados contra el nodo de Figma "Método de pago"
// (node-id 505-24248, archivo "Nuevos negocios", pantalla "Confirmación de compra").
// El modal de direcciones sigue el node-id 518-5150.

const SHIPPING_COST = 2400;
const SERVICE_FEE = 140;
const DISCOUNT = 0;
const AVAILABLE_CREDITS = 30000;
const FREE_SHIPPING_THRESHOLD = 40000;

function formatPrice(value: number) {
  return `$${new Intl.NumberFormat("es-CL").format(value)}`;
}

export default function ConfirmacionCompraPage() {
  const cart = useCart();
  const router = useRouter();
  const [deliverySelected, setDeliverySelected] = useState(true);
  const [creditsSelected, setCreditsSelected] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [resumenExpanded, setResumenExpanded] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const { selectedAddressId, setSelectedAddressId } = cart;

  const selectedAddress = SAVED_ADDRESSES.find((a) => a.id === selectedAddressId) ?? SAVED_ADDRESSES[0];

  const hasFreeShipping = cart.total >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = hasFreeShipping ? 0 : SHIPPING_COST;
  const subtotal = cart.total + shippingCost + SERVICE_FEE - DISCOUNT;
  const creditsApplied = creditsSelected ? Math.min(subtotal, AVAILABLE_CREDITS) : 0;
  const total = subtotal - creditsApplied;

  return (
    <main className="flex flex-1 flex-col">
      {/* Header */}
      <div className="flex items-center gap-1 bg-white px-3 py-3">
        <Link href="/carro" aria-label="Volver" className="flex h-10 w-10 items-center justify-center rounded-full text-ink-9">
          <ChevronLeftIcon className="h-6 w-6" />
        </Link>
        <h1 className="text-base font-semibold text-ink-9">Confirmación de compra</h1>
      </div>

      {/* Resumen */}
      <div className="bg-white">
        <button
          type="button"
          onClick={() => setResumenExpanded((v) => !v)}
          className="flex h-14 w-full items-center justify-between px-4"
        >
          <div className="flex items-center gap-1.5 text-sm text-ink-9">
            <span>Resumen</span>
            <span className="font-semibold text-ink-8">({cart.items.length})</span>
            <span className="font-semibold text-ink-8">{formatPrice(cart.total)}</span>
          </div>
          {resumenExpanded ? (
            <ChevronUpIcon className="h-6 w-6 text-ink-4" />
          ) : (
            <ChevronDownIcon className="h-6 w-6 text-ink-4" />
          )}
        </button>
        {resumenExpanded && (
          <div className="flex flex-col gap-5 px-4 pb-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex items-center gap-2 pr-2">
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded">
                  <Image src={item.image} alt={item.name} fill sizes="32px" className="object-cover" />
                </div>
                <p className="w-8 shrink-0 text-center text-xs leading-relaxed text-neutro-9">
                  {item.unit.replace("1 unidad", "1 un")}
                </p>
                <p className="flex-1 truncate text-xs font-medium text-ink-9">{item.name}</p>
                <p className="shrink-0 text-sm text-ink-9">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Método de entrega */}
      <div className="border-t border-b border-neutro-4 bg-white">
        <div className="flex h-14 items-center justify-between px-4">
          <p className="text-sm text-ink-9">Método de entrega</p>
          <ChevronUpIcon className="h-6 w-6 text-ink-4" />
        </div>
        <div className="px-4 pb-3">
          <div className="flex flex-col rounded-xl border border-neutro-5">
            <div className="flex h-14 items-center justify-between rounded-t-xl px-4">
              <div className="flex items-center gap-2 text-sm text-ink-9">
                <WalkingIcon className="h-6 w-6" />
                <span>Delivery</span>
              </div>
              <div className="flex h-4 w-4 items-center justify-center rounded bg-brand">
                <CheckIcon className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 px-4 py-2">
              <p className="flex-1 text-xs leading-relaxed text-ink-9">{selectedAddress.address}</p>
              <button
                type="button"
                onClick={() => setAddressModalOpen(true)}
                className="shrink-0 text-xs font-medium text-brand"
              >
                Cambiar
              </button>
            </div>
            <button
              type="button"
              onClick={() => setDeliverySelected((v) => !v)}
              className="flex h-14 items-center justify-between rounded-b-xl px-4"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    deliverySelected ? "border-brand" : "border-ink-4"
                  }`}
                >
                  {deliverySelected && <span className="h-2.5 w-2.5 rounded-full bg-brand" />}
                </span>
                <span className="text-xs text-neutro-9">24 - 48 horas</span>
              </div>
              <span className="text-xs text-neutro-9">{formatPrice(shippingCost)}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Método de pago */}
      <div className="flex h-14 items-center justify-between border-b border-neutro-4 bg-white px-4">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-ink-9">Método de pago</span>
          <span className="text-[#1d1b20]">***1299 - Débito</span>
        </div>
        <ChevronDownIcon className="h-6 w-6 text-ink-4" />
      </div>

      {/* Créditos, cupón y resumen de precios */}
      <div className="flex flex-col gap-2 bg-white p-4">
        <button
          type="button"
          onClick={() => setCreditsSelected((v) => !v)}
          className="flex h-14 items-center justify-between rounded-2xl border border-neutro-5 px-4"
        >
          <div className="flex items-center gap-3">
            <CoinIcon className="h-9 w-9 shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-xs text-[#49454f]">Usar mis GoodMeal Créditos</span>
              <span className="text-sm text-[#1d1b20]">$30.000</span>
            </div>
          </div>
          <span
            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border border-brand ${
              creditsSelected ? "bg-brand" : "bg-white"
            }`}
          >
            {creditsSelected && <CheckIcon className="h-3 w-3 text-white" />}
          </span>
        </button>

        <label className="flex h-14 items-center gap-2 rounded-full border border-neutro-4 px-3">
          <CouponIcon className="h-6 w-6 shrink-0 text-neutro-8" />
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Agrega un cupón o giftcard"
            className="flex-1 bg-transparent text-sm text-ink-9 placeholder:text-neutro-8 focus:outline-none"
          />
        </label>

        <div className="flex flex-col gap-2 pt-2 text-sm">
          <div className="flex items-start justify-between text-[#9f9fad]">
            <span>Monto total</span>
            <span>{formatPrice(cart.total)}</span>
          </div>
          <div className="flex items-start justify-between text-[#43b8a3]">
            <span>Cupón de descuento</span>
            <span>-{formatPrice(DISCOUNT)}</span>
          </div>
          <div className="flex items-start justify-between text-[#9f9fad]">
            <span>Envío</span>
            <span>{formatPrice(shippingCost)}</span>
          </div>
          <div className="flex items-start justify-between text-[#9f9fad]">
            <span className="flex items-center gap-1">
              Tarifa por servicio <InfoIcon className="h-4 w-4" />
            </span>
            <span>{formatPrice(SERVICE_FEE)}</span>
          </div>
          <div className="flex items-start justify-between font-semibold text-[#4b5563]">
            <span>Total de la compra</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <div className="h-24 shrink-0" />

      <div className="fixed inset-x-0 bottom-0 z-10 mx-auto w-full max-w-[430px] bg-white px-4 pt-2 pb-3">
        <button
          type="button"
          onClick={() => router.push("/resumen-compra")}
          className="flex h-16 w-full items-center justify-center rounded-full bg-brand text-base font-semibold text-white shadow-sm"
        >
          Pagar
        </button>
      </div>

      {addressModalOpen && (
        <div className="fixed inset-0 z-20 mx-auto flex w-full max-w-[430px] items-end">
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setAddressModalOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="relative flex max-h-[90vh] w-full flex-col gap-6 overflow-y-auto rounded-t-3xl bg-white pt-6 pr-6 pb-8 pl-6">
            <div className="flex shrink-0 items-start justify-between">
              <h2 className="text-lg font-semibold text-ink-9">Mis direcciones</h2>
              <button type="button" aria-label="Cerrar" onClick={() => setAddressModalOpen(false)}>
                <CloseIcon className="h-6 w-6 text-ink-9" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-1 rounded-full bg-neutro-5 py-1.5 pl-4 pr-4">
                <span className="flex-1 text-sm text-neutro-8">Agregar una nueva dirección</span>
                <SearchIcon className="h-6 w-6 text-neutro-8" />
              </div>

              <button type="button" className="flex items-center justify-between border-b border-neutro-5 py-2">
                <div className="flex items-center gap-4">
                  <LocationTargetIcon className="h-6 w-6 shrink-0" />
                  <div className="flex flex-col items-start gap-0.5 text-xs">
                    <span className="font-semibold text-black">usar mi ubicación actual</span>
                    <span className="text-neutro-9">Encuentra tiendas cerca de ti</span>
                  </div>
                </div>
                <ChevronRightIcon className="h-6 w-6 shrink-0 text-ink-9" />
              </button>
            </div>

            <div className="-mx-6 flex flex-col">
              {SAVED_ADDRESSES.map((addr) => (
                <button
                  key={addr.id}
                  type="button"
                  onClick={() => {
                    setSelectedAddressId(addr.id);
                    setAddressModalOpen(false);
                  }}
                  className={`flex items-center justify-between border-b border-neutro-5 px-6 py-4 ${
                    selectedAddressId === addr.id ? "bg-brand-1" : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        selectedAddressId === addr.id ? "border-brand" : "border-neutro-8"
                      }`}
                    >
                      {selectedAddressId === addr.id && <span className="h-2.5 w-2.5 rounded-full bg-brand" />}
                    </span>
                    <div className="flex flex-col items-start gap-1">
                      <span className="relative inline-flex">
                        <span
                          className={`flex items-center gap-1.5 rounded-2xl px-2 py-0.5 text-sm ${
                            selectedAddressId === addr.id
                              ? "bg-white text-brand"
                              : "border border-neutro-5 bg-neutro-1 text-neutro-9"
                          }`}
                        >
                          {addr.emoji} {addr.label}
                        </span>
                        {addr.favorite && (
                          <FavoriteBadgeIcon className="absolute -top-1.5 -right-1.5 h-4 w-4" />
                        )}
                      </span>
                      <p
                        className={`text-xs leading-relaxed ${
                          selectedAddressId === addr.id ? "text-brand" : "text-neutro-9"
                        }`}
                      >
                        {addr.address}
                      </p>
                    </div>
                  </div>
                  <MoreVerticalIcon className="h-6 w-6 shrink-0 text-ink-9" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
