"use client";

import { useState } from "react";
import {
  ChevronDownIcon,
  SearchIcon,
  HouseIcon,
  CakeIcon,
  BowlIcon,
  BreadIcon,
  PizzaSliceIcon,
  StorefrontIcon,
  PackageIcon,
  SmileIcon,
  CloseIcon,
  LeafIcon,
} from "@/components/icons";
import Image from "next/image";

const STATIC_CATEGORIES = [
  { label: "Antojos y Snacks", icon: CakeIcon },
  { label: "Almuerzos", icon: BowlIcon },
  { label: "Panadería", icon: BreadIcon },
  { label: "Pizzas", icon: PizzaSliceIcon },
] as const;

const HOUSEHOLD_SIZES = ["1", "2", "3", "4", "5", "6+"] as const;
type HouseholdSize = (typeof HOUSEHOLD_SIZES)[number];

const JUMBO_MARKUP = 0.3;
const LIDER_MARKUP = 0.24;
const MODAL_TRANSITION_MS = 300;

function formatPrice(value: number) {
  return `$${new Intl.NumberFormat("es-CL").format(value)}`;
}

function formatThousands(rawInput: string) {
  const digits = rawInput.replace(/\D/g, "");
  if (!digits) return "";
  return new Intl.NumberFormat("es-CL").format(Number(digits));
}

function calculateSavings(monthlySpend: number) {
  const jumboPrice = monthlySpend * (1 + JUMBO_MARKUP);
  const liderPrice = monthlySpend * (1 + LIDER_MARKUP);
  const monthly = Math.round(Math.max(jumboPrice, liderPrice) - monthlySpend);
  return { monthly, annual: monthly * 12 };
}

export default function GoodMealHomePage() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calculatorClosing, setCalculatorClosing] = useState(false);
  const [householdSize, setHouseholdSize] = useState<HouseholdSize | null>(null);
  const [amountDisplay, setAmountDisplay] = useState("");
  const [showResult, setShowResult] = useState(false);

  const amountValue = Number(amountDisplay.replace(/\D/g, "")) || 0;
  const canCalculate = householdSize !== null && amountValue > 0;
  const savings = calculateSavings(amountValue);

  function openCalculator() {
    setCalculatorOpen(true);
    setCalculatorClosing(false);
  }

  function closeCalculator() {
    setCalculatorClosing(true);
    setTimeout(() => {
      setCalculatorOpen(false);
      setCalculatorClosing(false);
      setHouseholdSize(null);
      setAmountDisplay("");
      setShowResult(false);
    }, MODAL_TRANSITION_MS);
  }

  return (
    <main className="flex flex-1 flex-col">
      <div className="flex flex-col gap-4 px-4 pt-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-brand-1 px-3 py-1.5">
            <HouseIcon className="h-4 w-4 text-brand" />
            <span className="text-sm font-semibold text-brand">Casa</span>
          </div>
          <span className="text-sm text-ink-4">Av. Los Leones 50</span>
          <ChevronDownIcon className="h-4 w-4 text-ink-4" />
        </div>

        <div className="flex items-center gap-2 rounded-2xl bg-neutro-3 px-4 py-3">
          <span className="flex-1 text-sm text-neutro-8">¿Qué quieres comer?</span>
          <SearchIcon className="h-5 w-5 text-ink-9" />
        </div>

        <div className="flex items-start gap-5 overflow-x-auto pb-2">
          <button type="button" onClick={openCalculator} className="tap-scale flex flex-col items-center gap-1.5">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-1">
              <Image src="/images/goodFresh-logo.png" alt="" width={32} height={32} className="object-contain" />
              <span className="absolute -top-1.5 right-0 rounded-full bg-brand px-1.5 py-0.5 text-[9px] font-bold text-white">Nuevo</span>
            </div>
            <span className="text-center text-xs font-medium text-ink-9">GoodFresh</span>
          </button>

          {STATIC_CATEGORIES.map(({ label, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutro-3">
                <Icon className="h-6 w-6 text-ink-9" />
              </div>
              <span className="w-16 text-center text-xs font-medium text-ink-9">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1" />

      <div className="h-[68px] shrink-0" />
      <div className="fixed inset-x-0 bottom-0 z-10 mx-auto flex w-full max-w-[430px] items-center justify-around border-t border-neutro-5 bg-white py-2">
        <div className="flex flex-col items-center gap-0.5 text-brand">
          <HouseIcon className="h-6 w-6" />
          <span className="text-[11px] font-semibold">Home</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-neutro-8">
          <StorefrontIcon className="h-6 w-6" />
          <span className="text-[11px] font-medium">Tiendas</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-neutro-8">
          <PackageIcon className="h-6 w-6" />
          <span className="text-[11px] font-medium">Órdenes</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-neutro-8">
          <SmileIcon className="h-6 w-6" />
          <span className="text-[11px] font-medium">Perfil</span>
        </div>
      </div>

      {calculatorOpen && (
        <div className="fixed inset-0 z-30 mx-auto flex w-full max-w-[430px] items-end">
          <button type="button" aria-label="Cerrar" onClick={closeCalculator} className="absolute inset-0 bg-black/40" />
          <div
            className="relative flex max-h-[92vh] w-full flex-col overflow-y-auto rounded-t-[30px] bg-green-1"
            style={{
              animation: `${calculatorClosing ? "sheet-slide-down" : "sheet-slide-up"} ${MODAL_TRANSITION_MS}ms cubic-bezier(0.2, 0.9, 0.3, 1) forwards`,
            }}
          >
            <div className="relative h-[130px] w-full shrink-0">
              <Image src="/images/portadaTienda.png" alt="Frutas y verduras frescas" fill sizes="430px" className="rounded-t-[30px] object-cover" />
              <button
                type="button"
                aria-label="Cerrar"
                onClick={closeCalculator}
                className="tap-scale absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
              >
                <CloseIcon className="h-5 w-5 text-ink-9" />
              </button>
            </div>

            <div className="flex flex-col gap-4 px-4 pt-4 pb-6">
              <div className="flex flex-col gap-1">
                <p className="text-lg font-bold text-ink-9">Ahorra en tu compra de frutas y verduras</p>
                <div className="flex items-center gap-1 text-sm">
                  <LeafIcon className="h-4 w-4 text-[#22b573]" />
                  <span className="font-bold text-[#22b573]">100% frescos</span>
                  <span className="text-ink-9"> a precios convenientes</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-center text-base font-bold text-ink-9">Calcula tu ahorro en 2 pasos</p>

                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-ink-9">1. ¿Cuántos son en tu hogar?</p>
                  <div className="flex items-center justify-between gap-1.5">
                    {HOUSEHOLD_SIZES.map((size) => {
                      const isSelected = householdSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setHouseholdSize(size)}
                          className={`tap-scale flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                            isSelected ? "border-brand bg-brand-1 text-brand" : "border-neutro-5 text-ink-9"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-ink-9">2. ¿Cuánto gastas al mes en frutas y verduras?</p>
                  <div className="flex items-center gap-2 rounded-2xl border border-neutro-5 px-4 py-3">
                    <span className="text-lg text-ink-9">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={amountDisplay}
                      onChange={(event) => setAmountDisplay(formatThousands(event.target.value))}
                      placeholder="15.000"
                      className="flex-1 bg-transparent text-base text-ink-9 outline-none placeholder:text-neutro-7"
                    />
                    {amountValue > 0 && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#22b573]" />}
                  </div>
                  <p className="text-xs text-neutro-8">Ingresa el monto aproximado</p>
                </div>

                <button
                  type="button"
                  disabled={!canCalculate}
                  onClick={() => setShowResult(true)}
                  className="tap-scale flex w-full items-center justify-center rounded-full bg-brand px-4 py-3 text-base font-medium text-white disabled:opacity-40"
                >
                  Calcular mi ahorro
                </button>
              </div>

              {showResult && (
                <div className="flex flex-col gap-4 rounded-2xl bg-[#22b573] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white">
                      <Image src="/images/goodFresh-logo.png" alt="" width={30} height={30} className="object-contain" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <p className="text-sm text-white/90">Con GoodFresh, te podrías ahorrar</p>
                      <p className="text-2xl font-extrabold text-white">{formatPrice(savings.annual)} al año</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-aqua-1 px-4 py-3">
                    <div className="flex flex-col">
                      <p className="text-xs text-ink-9">Ahorro mensual</p>
                      <p className="text-lg font-bold text-ink-9">{formatPrice(savings.monthly)}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-xs text-ink-9">Integrantes</p>
                      <p className="text-lg font-bold text-ink-9">{householdSize}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
