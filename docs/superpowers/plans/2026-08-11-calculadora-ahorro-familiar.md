# Calculadora de Ahorro Familiar — Home de GoodMeal + Modal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimal GoodMeal home screen at `/`, move the existing GoodFresh store to `/tienda-goodfresh`, and add a promotional modal (opened from the home's "GoodFresh" category icon) with a 2-step savings calculator that ends in a CTA into the store.

**Architecture:** Two new/moved Next.js App Router pages (`src/app/page.tsx` rewritten as the GoodMeal home, `src/app/tienda-goodfresh/page.tsx` as the moved store) plus five one-line link fixes in existing pages. The calculator modal is built **inline inside the new `src/app/page.tsx`**, not as a separate component file — this matches the existing convention in this codebase, where the other two bottom-sheet modals (`src/app/carro/page.tsx`, `src/app/confirmacion-compra/page.tsx`) are also inline in the page that uses them, not extracted into `src/components/`. Eight new decorative icons are added to the existing single-file icon library (`src/components/icons.tsx`), following that file's existing pattern.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. No test framework exists in this repo (no Jest/Vitest/Playwright, confirmed via `package.json` — only `next`, `react`, `react-dom`, `eslint`). This is a visual, backend-less prototype; the existing verification convention (see `compra-exitosa`, `carro`, `confirmacion-compra`) is manual verification against Figma via the dev server, not automated tests.

## Global Constraints

- No test framework in this repo. Every task's verification is: (1) `npx tsc --noEmit` must pass with zero errors, (2) `npm run lint` must pass with zero errors, (3) a manual check in the browser via the dev server, described precisely in each task (exact URL, exact clicks, exact expected text/colors). Do not introduce a test framework as part of this plan — that would be an unrelated, unrequested change.
- Mobile-only layout, fixed `max-w-[430px]` container — this is already handled globally by `src/app/layout.tsx`. Page components must NOT add their own `max-w-[430px]` wrapper around their top-level content (only `fixed`-positioned elements like bottom bars/modals need to repeat `mx-auto w-full max-w-[430px]` to escape normal flow — see `BottomCartBar.tsx` for the existing pattern).
- Color tokens live in `src/app/globals.css` as Tailwind `@theme` variables (`--color-brand-*`, `--color-neutro-*`, `--color-ink-*`, `--color-green-*`, `--color-aqua-*`). Use the existing Tailwind utility classes (`bg-brand`, `text-ink-9`, etc.) wherever a token exists. The GoodFresh green (`#22b573`) is **not** a named token — the existing codebase inlines it directly (see `src/app/page.tsx:84` today, `text-[#22b573]`); follow that exact precedent, do not invent a new token for it.
- All images must come from `/public/images/` and only reference files that already exist there. Do not invent new image files. New decorative icons (category row, tab bar) must be inline SVG components added to `src/components/icons.tsx`, matching that file's existing style: `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `strokeWidth="2"`, `strokeLinecap="round"`, `strokeLinejoin="round"`, `aria-hidden="true"`, accepting a `className` prop.
- Exact copy strings (verified against Figma nodes `1026:5338`, `1026:6559`, `1028:8654` — do not paraphrase):
  - Modal title: `Ahorra en tu compra de frutas y verduras`
  - Modal subtitle line: `100% frescos` (green, bold) + ` a precios convenientes` (dark)
  - Form card title: `Calcula tu ahorro en 2 pasos`
  - Step 1 label: `1. ¿Cuántos son en tu hogar?`
  - Step 2 label: `2. ¿Cuánto gastas al mes en frutas y verduras?`
  - Amount input placeholder: `15.000`
  - Amount helper text: `Ingresa el monto aproximado`
  - Form button: `Calcular mi ahorro`
  - Result header: `Con GoodFresh, te podrías ahorrar`
  - Result row labels: `Ahorro mensual` and `Integrantes`
  - Final CTA: `Empieza ahorrar hoy`
- Calculation formula (per user decision in the design spec, section 6 — deliberately does NOT match the single numeric example shown in Figma):
  ```
  JUMBO_MARKUP = 0.30
  LIDER_MARKUP = 0.24
  jumboPrice = monthlySpend * (1 + JUMBO_MARKUP)
  liderPrice = monthlySpend * (1 + LIDER_MARKUP)
  monthlySavings = round(max(jumboPrice, liderPrice) - monthlySpend)
  annualSavings = monthlySavings * 12
  ```
- Household size options are exactly: `1`, `2`, `3`, `4`, `5`, `6+` (single-select, no default selection).
- Spec reference: `docs/superpowers/specs/2026-08-11-calculadora-ahorro-familiar-design.md`. If anything in this plan seems to contradict that file, the spec wins — flag it instead of silently picking one.

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `src/app/tienda-goodfresh/page.tsx` | Create (moved) | Exact current content of `src/app/page.tsx` — the GoodFresh store. No content changes. |
| `src/app/page.tsx` | Rewrite | New GoodMeal home: address pill, search bar, category row (GoodFresh opens the modal), the savings calculator modal (inline), bottom tab bar (inline). |
| `src/components/icons.tsx` | Modify (append) | Add `HouseIcon`, `CakeIcon`, `BowlIcon`, `BreadIcon`, `PizzaSliceIcon`, `StorefrontIcon`, `PackageIcon`, `SmileIcon`. |
| `src/app/caja-completa/page.tsx` | Modify | Both `href="/"` → `href="/tienda-goodfresh"`. |
| `src/app/caja-ensaladas/page.tsx` | Modify | Both `href="/"` → `href="/tienda-goodfresh"`. |
| `src/app/caja-frutas/page.tsx` | Modify | Both `href="/"` → `href="/tienda-goodfresh"`. |
| `src/app/compra-exitosa/page.tsx` | Modify | `router.push("/")` → `router.push("/tienda-goodfresh")`. |
| `src/app/mi-orden/page.tsx` | Modify | `router.push("/")` → `router.push("/tienda-goodfresh")`. |

---

### Task 1: Mover la tienda GoodFresh a `/tienda-goodfresh` y corregir enlaces internos

**Files:**
- Create: `src/app/tienda-goodfresh/page.tsx`
- Delete: `src/app/page.tsx` (recreated as the new home in Task 2 — after this task, `/` will 404, which is expected and temporary)
- Modify: `src/app/caja-completa/page.tsx`
- Modify: `src/app/caja-ensaladas/page.tsx`
- Modify: `src/app/caja-frutas/page.tsx`
- Modify: `src/app/compra-exitosa/page.tsx`
- Modify: `src/app/mi-orden/page.tsx`

**Interfaces:**
- Produces: route `/tienda-goodfresh` serving the exact current store page (component `TiendaGoodFreshPage`, unchanged).

- [ ] **Step 1: Move the store page to its new route**

```bash
mkdir -p src/app/tienda-goodfresh
git mv src/app/page.tsx src/app/tienda-goodfresh/page.tsx
```

- [ ] **Step 2: Fix the back-arrow and "Seguir comprando" links in the three box-editor pages**

These three files have the identical two occurrences of `href="/"` (a back-arrow `Link` with `aria-label="Volver"`, and a "Seguir comprando" `Link`). In each of the following three files, replace both:

`src/app/caja-completa/page.tsx`:
```tsx
// before (appears twice, lines ~160 and ~383)
href="/"
// after
href="/tienda-goodfresh"
```

`src/app/caja-ensaladas/page.tsx`: same replacement (lines ~142 and ~365).

`src/app/caja-frutas/page.tsx`: same replacement (lines ~147 and ~370).

(Both occurrences in each file map to the same new value, so a find-and-replace of `href="/"` → `href="/tienda-goodfresh"` within each of these three files is safe — there are no other `href="/"` occurrences in them.)

- [ ] **Step 3: Fix the "seguir comprando" redirect in `compra-exitosa`**

In `src/app/compra-exitosa/page.tsx`, inside `handleSeguirComprando` (around line 42):

```tsx
// before
  function handleSeguirComprando() {
    cart.setItems([]);
    cart.setActiveBoxId(null);
    router.push("/");
  }
// after
  function handleSeguirComprando() {
    cart.setItems([]);
    cart.setActiveBoxId(null);
    router.push("/tienda-goodfresh");
  }
```

- [ ] **Step 4: Fix the "volver" redirect in `mi-orden`**

In `src/app/mi-orden/page.tsx`, inside `handleVolver` (around line 45):

```tsx
// before
  function handleVolver() {
    cart.setItems([]);
    cart.setActiveBoxId(null);
    router.push("/");
  }
// after
  function handleVolver() {
    cart.setItems([]);
    cart.setActiveBoxId(null);
    router.push("/tienda-goodfresh");
  }
```

- [ ] **Step 5: Type-check and lint**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 6: Manual verification via dev server**

Start the dev server (use the project's preview tool, name `dev` per `.claude/launch.json` if present, otherwise `npm run dev`).

- Navigate to `/tienda-goodfresh` → the GoodFresh store screen loads exactly as it did before at `/` (cover photo, "GoodFresh" header, boxes, product grid, bottom cart bar).
- Navigate to `/` → expect a 404 (Next.js default not-found page). This is expected and temporary; Task 2 fixes it.
- From `/tienda-goodfresh`, open any box (e.g. "Caja completa"), then tap the back arrow → confirm it returns to `/tienda-goodfresh` (not a 404).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Mueve la tienda GoodFresh a /tienda-goodfresh y corrige enlaces internos"
```

---

### Task 2: Construir el shell del home de GoodMeal (estático, sin modal)

**Files:**
- Modify: `src/components/icons.tsx`
- Create: `src/app/page.tsx`

**Interfaces:**
- Consumes: `ChevronDownIcon`, `SearchIcon` (already exist in `src/components/icons.tsx`).
- Produces: `HouseIcon`, `CakeIcon`, `BowlIcon`, `BreadIcon`, `PizzaSliceIcon`, `StorefrontIcon`, `PackageIcon`, `SmileIcon` — all `({ className }: { className?: string }) => JSX.Element`, exported from `src/components/icons.tsx`, same signature as every existing icon in that file.
- Produces: default-exported `GoodMealHomePage` component at route `/`, rendering the static shell described below. No interactivity yet (Task 3 wires the GoodFresh tap).

- [ ] **Step 1: Add the eight new icons to `src/components/icons.tsx`**

Append these to the end of `src/components/icons.tsx` (same file, same `IconProps` type already declared at the top):

```tsx
export function HouseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 11l9-8 9 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CakeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 21h16v-6a4 4 0 00-4-4H8a4 4 0 00-4 4v6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 11V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9.5 6c0-1 .7-1.8 1-2.5.3.7 1 1.5 1 2.5M12.5 6c0-1 .7-1.8 1-2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BowlIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 12h18a9 9 0 01-18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 6c1.2 0 1.8-1 2.5-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function BreadIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 13a8 5 0 0116 0v5a1 1 0 01-1 1H5a1 1 0 01-1-1v-5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 13v5M12 13v5M16 13v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PizzaSliceIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3l9 17H3L12 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="1" fill="currentColor" />
      <circle cx="10" cy="17" r="1" fill="currentColor" />
      <circle cx="14" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

export function StorefrontIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 9l1.5-5h15L21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M4 9a2 2 0 004 0 2 2 0 004 0 2 2 0 004 0 2 2 0 004 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5 9v10h14V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PackageIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M21 8l-9-5-9 5 9 5 9-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 8v8l9 5 9-5V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 13v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SmileIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
      <path d="M8 14c1 1.5 2.5 2 4 2s3-.5 4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
```

- [ ] **Step 2: Create the static home shell at `src/app/page.tsx`**

```tsx
import { ChevronDownIcon, SearchIcon, HouseIcon, CakeIcon, BowlIcon, BreadIcon, PizzaSliceIcon, StorefrontIcon, PackageIcon, SmileIcon } from "@/components/icons";
import Image from "next/image";

const STATIC_CATEGORIES = [
  { label: "Antojos y Snacks", icon: CakeIcon },
  { label: "Almuerzos", icon: BowlIcon },
  { label: "Panadería", icon: BreadIcon },
  { label: "Pizzas", icon: PizzaSliceIcon },
] as const;

export default function GoodMealHomePage() {
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
          <div className="flex flex-col items-center gap-1.5">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-1">
              <Image src="/images/goodFresh-logo.png" alt="" width={32} height={32} className="object-contain" />
              <span className="absolute -top-1.5 right-0 rounded-full bg-brand px-1.5 py-0.5 text-[9px] font-bold text-white">Nuevo</span>
            </div>
            <span className="text-center text-xs font-medium text-ink-9">GoodFresh</span>
          </div>

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
    </main>
  );
}
```

Note: the GoodFresh tile has no `onClick` yet — Task 3 adds the modal state and wires this tile to open it, in the same change, so there is never a tappable-looking element that does nothing.

- [ ] **Step 3: Type-check and lint**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Manual verification via dev server**

Navigate to `/`:
- Address pill "Casa" (pink) + "Av. Los Leones 50" + chevron render at the top.
- Search bar placeholder "¿Qué quieres comer?" renders.
- Category row shows GoodFresh (with green circular badge using the real logo image and a pink "Nuevo" badge) followed by Antojos y Snacks, Almuerzos, Panadería, Pizzas with their icons.
- Bottom tab bar shows Home (pink, active), Tiendas, Órdenes, Perfil (gray), fixed to the bottom, content is not hidden behind it.
- No console errors (check via the browser tool's console reader).

- [ ] **Step 5: Commit**

```bash
git add src/components/icons.tsx src/app/page.tsx
git commit -m "Agrega el shell estático del home de GoodMeal"
```

---

### Task 3: Modal de calculadora de ahorro — formulario, validación, cálculo y resultado

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `CloseIcon`, `LeafIcon` (already exist in `src/components/icons.tsx`); `sheet-slide-up` / `sheet-slide-down` keyframes (already exist in `src/app/globals.css`); `HouseIcon` and the rest from Task 2.
- Produces: local state and helpers inside `GoodMealHomePage` — `calculatorOpen: boolean`, `calculatorClosing: boolean`, `householdSize: HouseholdSize | null`, `amountDisplay: string`, `showResult: boolean`, `calculateSavings(monthlySpend: number): { monthly: number; annual: number }`. These names are used again in Task 4 — keep them exact.

- [ ] **Step 1: Add state, constants, and the calculation helper to `src/app/page.tsx`**

Add near the top of the file, above the component (after the imports):

```tsx
"use client";

import { useState } from "react";
// ...existing icon imports from Task 2, plus:
import { CloseIcon, LeafIcon } from "@/components/icons";

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
```

Note: `page.tsx` becomes a Client Component (`"use client"`) in this step because it now needs `useState`. This is consistent with `src/app/carro/page.tsx` and `src/app/confirmacion-compra/page.tsx`, which are also client components for the same reason.

- [ ] **Step 2: Add the modal state and handlers inside `GoodMealHomePage`**

```tsx
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

  // ...rest of component from Task 2
```

- [ ] **Step 3: Wire the GoodFresh tile to open the modal**

Replace the GoodFresh tile's outer `<div>` (from Task 2) with a `<button>`:

```tsx
// before
<div className="flex flex-col items-center gap-1.5">
  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-1">
// after
<button type="button" onClick={openCalculator} className="tap-scale flex flex-col items-center gap-1.5">
  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-1">
```

And close it with `</button>` instead of `</div>` at the end of that tile.

- [ ] **Step 4: Add the modal JSX**

Add this right before the closing `</main>` tag (after the bottom tab bar):

```tsx
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
```

(The final CTA button inside the result card, "Empieza ahorrar hoy", is added in Task 4 along with its navigation behavior — kept separate so this task's reviewable unit is strictly "the modal opens, validates, calculates, and shows correct numbers.")

- [ ] **Step 5: Type-check and lint**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 6: Manual verification via dev server**

Navigate to `/`, tap the GoodFresh tile:
- Modal slides up from the bottom over a darkened backdrop.
- Tapping the backdrop or the X closes it (slide-down animation).
- "Calcular mi ahorro" is visibly disabled (dim) until both a household size pill is selected AND a non-zero amount is typed.
- Type `100000` in the amount field → it displays as `100.000` and a small green dot appears at the right edge of the input.
- Select `4` → the pill turns pink/bordered-pink.
- Tap "Calcular mi ahorro" → a green result card appears below, showing:
  - `Con GoodFresh, te podrías ahorrar` / `$216.000 al año` (from `100000 * 1.30 - 100000 = 30000` monthly → `30000 * 12 = 360000`... **verify this specific number by hand before checking it off**: `100000 × 1.30 = 130000`, `130000 − 100000 = 30000` monthly, `× 12 = 360000` annual. Confirm the modal shows `$30.000` for "Ahorro mensual" and `$360.000 al año` for the headline, and `4` for "Integrantes". (This intentionally differs from the Figma mockup's `$18.000`/`$216.000` example — see the Global Constraints note on the calculation formula.)
- Close and reopen the modal (tap GoodFresh again) → form is reset (no pill selected, empty amount, no result card).

- [ ] **Step 7: Commit**

```bash
git add src/app/page.tsx
git commit -m "Agrega el modal de calculadora de ahorro con formulario, validación y resultado"
```

---

### Task 4: CTA final hacia la tienda y verificación end-to-end del flujo completo

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `useRouter` from `next/navigation` (same import already used in `src/app/compra-exitosa/page.tsx` and `src/app/mi-orden/page.tsx`); `closeCalculator` from Task 3.

- [ ] **Step 1: Add the router and the final CTA button**

Add the import and hook:

```tsx
import { useRouter } from "next/navigation";
// ...
export default function GoodMealHomePage() {
  const router = useRouter();
  // ...rest of state from Task 3
```

Add the CTA button as the last child inside the result card's outer `<div className="flex flex-col gap-4 rounded-2xl bg-[#22b573] p-4">` from Task 3, right after the `Ahorro mensual` / `Integrantes` row:

```tsx
                  <button
                    type="button"
                    onClick={() => {
                      closeCalculator();
                      router.push("/tienda-goodfresh");
                    }}
                    className="tap-scale flex w-full items-center justify-center rounded-full bg-white px-4 py-3 text-base font-medium text-[#22b573]"
                  >
                    Empieza ahorrar hoy
                  </button>
```

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Manual end-to-end verification via dev server**

Full flow from a cold load of `/`:
1. Tap GoodFresh → modal opens.
2. Select household size `2`, type `50000` in the amount field (displays `50.000`).
3. Tap "Calcular mi ahorro" → result card appears. By hand: `50000 × 1.30 = 65000`, monthly savings `= 15000`, annual `= 180000`. Confirm the card shows `$180.000 al año`, `Ahorro mensual $15.000`, `Integrantes 2`.
4. Tap "Empieza ahorrar hoy" → modal closes AND the app navigates to `/tienda-goodfresh` (the GoodFresh store screen renders).
5. From `/tienda-goodfresh`, tap the back arrow on any box (e.g. "Caja completa") → still lands on `/tienda-goodfresh` (confirms Task 1's link fixes still hold after this task's changes).
6. Navigate back to `/` directly → confirm it's the GoodMeal home again (not a 404, not the store) and the modal is closed by default.
7. Check the browser console for errors (via the browser tool's console reader) — expect none.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "Conecta el CTA final del modal con la navegación a /tienda-goodfresh"
```
