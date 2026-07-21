"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, CartIcon, CloseIcon, MinusIcon, PlusIcon, SearchIcon } from "@/components/icons";
import { catalog, type CatalogProduct } from "@/data/catalog";
import { normalize } from "@/lib/normalize";
import { useCart, type CartItem } from "@/context/CartContext";

// Misma estructura de la pantalla "Caja ensalada" (node-id 456-3201), con los
// productos reemplazados por frutas.

type IncludedItem = CartItem;

type SuggestedItem = {
  id: string;
  name: string;
  unit: string;
  price: number;
  image: string;
};

// Opciones de madurez por producto; si un producto no tiene entrada acá, usa
// las opciones por defecto ("Para hoy" / "2 - 3 días").
const RIPENESS_OPTIONS: Record<string, readonly NonNullable<IncludedItem["ripeness"]>[]> = {
  platano: ["Más verdes", "Más amarillos"],
};
const DEFAULT_RIPENESS_OPTIONS: readonly NonNullable<IncludedItem["ripeness"]>[] = ["Para hoy", "2 - 3 días"];

// Productos que, al agregarlos desde el buscador, deben mostrarse con el
// mismo diseño (pill + botones de Madurez) que "Palta Hass Chilena".
const SEARCH_ADD_EXTRAS: Record<string, Partial<IncludedItem>> = {
  "palta-hass-peruana": { badge: "Temporada", ripeness: "Para hoy" },
  "palta-hass-chilena": { badge: "Temporada", ripeness: "Para hoy" },
};

const initialIncluded: IncludedItem[] = [
  { id: "platano", name: "Plátano", unit: "1 kilo", price: 1556, image: "/images/platano.png", quantity: 1, ripeness: "Más verdes" },
  { id: "naranjas", name: "Naranjas", unit: "1 kilo", price: 1500, image: "/images/naranjas.png", quantity: 1 },
  { id: "frutillas", name: "Frutillas", unit: "500 gr.", price: 1778, image: "/images/frutillas.png", quantity: 1 },
  { id: "manzana-fuji", name: "Manzana Fuji", unit: "1 kilo", price: 2111, image: "/images/manzanaFuji.png", quantity: 1 },
];

const initialSuggested: SuggestedItem[] = [
  { id: "kiwi", name: "Kiwi", unit: "500 gr.", price: 1111, image: "/images/kiwi.png" },
  { id: "uva-roja", name: "Uva Roja", unit: "500 gr.", price: 1556, image: "/images/uva-roja.jpg" },
  { id: "mandarina", name: "Mandarina", unit: "500 gr.", price: 1333, image: "/images/mandarinas.png" },
  { id: "pera", name: "Pera", unit: "500 gr.", price: 2000, image: "/images/pera.png" },
];

function formatPrice(value: number) {
  return `$${new Intl.NumberFormat("es-CL").format(value)}`;
}

export default function CajaFrutasPage() {
  const cart = useCart();
  // Mientras el usuario arma la caja, los cambios viven en estado local: el
  // carro global solo se actualiza al presionar "Agregar al carrito".
  const [included, setIncluded] = useState<IncludedItem[]>(() =>
    cart.activeBoxId === "caja-frutas" ? cart.items : initialIncluded
  );
  const [suggested, setSuggested] = useState(initialSuggested);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const total = included.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const includedIds = new Set(included.map((item) => item.id));
  const searchResults =
    query.trim().length > 0
      ? catalog.filter((p) => normalize(p.name).includes(normalize(query)) && !includedIds.has(p.id)).slice(0, 8)
      : [];

  function updateQuantity(id: string, delta: number) {
    setIncluded((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
    );
  }

  function removeIncluded(id: string) {
    const removed = included.find((item) => item.id === id);
    setIncluded((items) => items.filter((item) => item.id !== id));
    if (removed) {
      const { name, unit, price, image } = removed;
      setSuggested((items) => [...items, { id, name, unit, price, image }]);
    }
  }

  function setRipeness(id: string, ripeness: IncludedItem["ripeness"]) {
    setIncluded((items) => items.map((item) => (item.id === id ? { ...item, ripeness } : item)));
  }

  function addSuggested(item: SuggestedItem) {
    setIncluded((items) => (items.some((i) => i.id === item.id) ? items : [...items, { ...item, quantity: 1 }]));
    setSuggested((items) => items.filter((i) => i.id !== item.id));
  }

  function addFromSearch(product: CatalogProduct) {
    setIncluded((items) =>
      items.some((i) => i.id === product.id) ? items : [...items, { ...product, quantity: 1, ...SEARCH_ADD_EXTRAS[product.id] }]
    );
    setSuggested((items) => items.filter((i) => i.id !== product.id));
    setQuery("");
  }

  function handleAddToCart() {
    // Si el carro ya tenía productos de otro origen (sueltos, u otra caja),
    // se conservan y se suman a los de esta caja en vez de reemplazarlos.
    const preserved =
      cart.activeBoxId === "caja-frutas" ? [] : cart.items.filter((item) => !included.some((i) => i.id === item.id));
    cart.setItems([...preserved, ...included]);
    cart.setActiveBoxId("caja-frutas");
    cart.setIsRepeatOrder(false);
    router.push("/carro");
  }

  return (
    <main className="flex flex-1 flex-col">
      {/* Header */}
      <div className="fixed inset-x-0 top-0 z-20 mx-auto flex w-full max-w-[430px] items-center justify-between bg-white px-3 py-3">
        <Link
          href="/"
          aria-label="Volver"
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink-9"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Link>
        <button
          type="button"
          aria-label="Carrito"
          onClick={() => router.push("/carro")}
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-9"
        >
          <CartIcon className="h-5 w-5" />
          {cart.items.length > 0 && (
            <span className="absolute top-[-1px] right-[2px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#fa26a3] px-1 text-[9px] font-bold text-white">
              {cart.items.length}
            </span>
          )}
        </button>
      </div>
      <div className="h-16 shrink-0" />

      {/* Hero: dos fotos lado a lado */}
      <div className="flex w-full">
        <div className="relative h-[151px] w-[64.4%]">
          <Image src="/images/cajaFrutas.png" alt="Caja frutas" fill priority sizes="252px" className="object-cover" />
        </div>
        <div className="relative h-[151px] w-[35.6%]">
          <Image src="/images/cajaverdurasGrande.png" alt="Recuerda devolver tu caja" fill sizes="139px" className="object-cover" />
        </div>
      </div>

      {/* Info del pack */}
      <div className="flex flex-col gap-4 border-b border-[#f5f5f7] px-4 pt-4 pb-3.5">
        <div className="flex w-full items-center gap-4">
          <h1 className="flex-1 text-xl font-bold text-ink-9">Caja frutas</h1>
        </div>
        <p className="text-[14px] text-ink-9" style={{ lineHeight: 1.7 }}>
          Saca y agrega lo que necesitas
        </p>
      </div>

      {/* Productos incluidos */}
      <div className="flex flex-col gap-2 bg-neutro-3 px-4 pt-2 pb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-ink-9">Productos incluidos</h2>
        </div>

        {included.map((item) => (
          <div key={item.id} className="flex flex-col gap-2 rounded-lg border border-neutro-4 bg-white p-2">
            <div className="flex items-center justify-between">
              <div className="flex w-[94px] items-center gap-2">
                <div className="relative h-8 w-8 shrink-0">
                  <Image src={item.image} alt={item.name} fill sizes="32px" className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <p className="truncate text-xs font-medium text-ink-9">{item.name}</p>
                  <div className="flex items-center gap-0.5">
                    <p className="text-[10px] text-ink-3">{item.unit}</p>
                    {item.badge && (
                      <span className="rounded-full bg-green-1 px-1 py-px text-[9px] text-aqua-7">{item.badge}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-ink-9">{formatPrice(item.price * item.quantity)}</p>
                <div className="flex w-[100px] items-center justify-between rounded-full border border-neutro-5 bg-white p-1">
                  <button
                    type="button"
                    aria-label={item.quantity <= 1 ? `Quitar ${item.name}` : "Restar"}
                    onClick={() => (item.quantity <= 1 ? removeIncluded(item.id) : updateQuantity(item.id, -1))}
                    className="flex h-6 w-6 items-center justify-center"
                  >
                    <MinusIcon className="h-4 w-4 text-ink-9" />
                  </button>
                  <span className="text-xs font-medium text-ink-9">{item.quantity}</span>
                  <button type="button" aria-label="Sumar" onClick={() => updateQuantity(item.id, 1)} className="flex h-6 w-6 items-center justify-center">
                    <PlusIcon className="h-4 w-4 text-ink-9" />
                  </button>
                </div>
              </div>
            </div>
            {item.ripeness && (
              <div className="flex items-center justify-end gap-1">
                <span className="text-[10px] font-bold text-[#5d6673]">Madurez:</span>
                {(RIPENESS_OPTIONS[item.id] ?? DEFAULT_RIPENESS_OPTIONS).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setRipeness(item.id, option)}
                    className={`rounded-full border px-3 py-1 text-[10px] ${
                      item.ripeness === option ? "border-brand text-brand" : "border-[#c4c4c4] text-[#5d6673]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Buscador */}
      <div className="flex flex-col gap-2 px-4 pt-1 pb-2">
        <p className="text-center text-[14px] text-ink-9">¿Quieres agregar algo más?</p>
        <div className="tap-scale flex w-full items-center gap-1 rounded-full border border-neutro-8 bg-white px-4 py-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar producto"
            className="flex-1 bg-transparent text-[14px] text-ink-9 placeholder:text-neutro-9 focus:outline-none"
          />
          {query.trim().length > 0 ? (
            <button
              type="button"
              aria-label="Limpiar búsqueda"
              onClick={() => setQuery("")}
              className="flex items-center justify-center rounded-full p-1"
            >
              <CloseIcon className="h-3 w-3 text-neutro-9" />
            </button>
          ) : (
            <div className="flex items-center justify-center rounded-full p-1">
              <SearchIcon className="h-[15px] w-[15px] text-neutro-9" />
            </div>
          )}
        </div>

        {query.trim().length > 0 && (
          <div className="flex flex-col gap-2 pt-1">
            {searchResults.length === 0 && (
              <p className="text-center text-[10px] text-neutro-8">No encontramos productos con ese nombre.</p>
            )}
            {searchResults.map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-lg border border-neutro-4 bg-white p-2">
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 shrink-0">
                    <Image src={product.image} alt={product.name} fill sizes="32px" className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs font-medium text-ink-9">{product.name}</p>
                    <p className="text-[10px] text-ink-3">{product.unit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-xs font-bold text-ink-9">{formatPrice(product.price)}</p>
                  <button
                    type="button"
                    aria-label={`Agregar ${product.name}`}
                    onClick={() => addFromSearch(product)}
                    className="flex items-center justify-center rounded-full bg-ink-9 p-2 text-white shadow-sm"
                  >
                    <PlusIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sugeridos */}
      <div className={`flex flex-col gap-2 px-4 pb-4 ${query.trim().length > 0 ? "hidden" : ""}`}>
        {suggested.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border border-neutro-4 bg-white p-2">
            <div className="flex items-center gap-2 opacity-60">
              <div className="relative h-8 w-8 shrink-0">
                <Image src={item.image} alt={item.name} fill sizes="32px" className="object-cover" />
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-medium text-ink-9">{item.name}</p>
                <p className="text-[10px] text-ink-3">{item.unit}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-xs font-bold text-ink-3">{formatPrice(item.price)}</p>
              <button
                type="button"
                aria-label={`Agregar ${item.name}`}
                onClick={() => addSuggested(item)}
                className="flex items-center justify-center rounded-full bg-ink-9 p-2 text-white shadow-sm"
              >
                <PlusIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="h-[124px] shrink-0" />

      {/* Barra inferior */}
      <div className="fixed inset-x-0 bottom-0 z-10 mx-auto flex w-full max-w-[430px] flex-col gap-2.5 rounded-b-card bg-white px-4 py-3 shadow-[0_-10px_5px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-xl font-black text-ink-9">{formatPrice(total)}</p>
            <p className="text-[10px] text-aqua-9">Envío gratis desde $40.000</p>
          </div>
          <p className="text-xs text-ink-3">{included.length} productos seleccionados</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="tap-scale flex flex-1 items-center justify-center rounded-full border border-brand px-5 py-3 text-[14px] leading-[1.5] font-medium text-brand"
          >
            Seguir comprando
          </Link>
          <button
            type="button"
            onClick={handleAddToCart}
            className="tap-scale flex flex-1 items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-1 shadow-sm"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </main>
  );
}
