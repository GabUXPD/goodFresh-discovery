"use client";

import Image from "next/image";
import { MinusIcon, PlusIcon } from "./icons";
import { useCart, type CartItem } from "@/context/CartContext";

export type Product = {
  id: string;
  name: string;
  unit: string;
  image: string;
  price: number;
  cashback?: string;
};

type Ripeness = NonNullable<CartItem["ripeness"]>;

// Productos que muestran el selector de "Madurez" al agregarlos; el primer
// valor de cada arreglo se usa como selección por defecto.
const RIPENESS_OPTIONS: Record<string, readonly [Ripeness, Ripeness]> = {
  platano: ["Más verdes", "Más amarillos"],
  "palta-hass-chilena": ["Para hoy", "2 - 3 días"],
  "palta-hass-peruana": ["Para hoy", "2 - 3 días"],
};

function formatPrice(value: number) {
  return `$${new Intl.NumberFormat("es-CL").format(value)}`;
}

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const cartItem = cart.items.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity ?? 0;
  const ripenessOptions = RIPENESS_OPTIONS[product.id];

  function handleAdd() {
    cart.setItems((items) =>
      items.some((item) => item.id === product.id)
        ? items
        : [
            ...items,
            {
              id: product.id,
              name: product.name,
              unit: product.unit,
              price: product.price,
              image: product.image,
              quantity: 1,
              ...(ripenessOptions && { ripeness: ripenessOptions[0] }),
            },
          ]
    );
  }

  function setRipeness(ripeness: Ripeness) {
    cart.setItems((items) => items.map((item) => (item.id === product.id ? { ...item, ripeness } : item)));
  }

  function handleDecrease() {
    if (quantity <= 1) {
      cart.setItems((items) => items.filter((item) => item.id !== product.id));
    } else {
      cart.updateQuantity(product.id, -1);
    }
  }

  return (
    <div className="relative flex w-full flex-col items-center gap-1 rounded-[12px] border border-neutro-5 bg-white p-2">
      <div className="relative h-20 w-20 shrink-0">
        <Image src={product.image} alt={product.name} fill sizes="80px" className="object-cover" />
      </div>
      {quantity > 0 && ripenessOptions ? (
        <div className="absolute top-[3px] right-[3px] z-20 flex w-[100px] flex-col items-center rounded-t-2xl rounded-b-lg border border-neutro-4 bg-white shadow-[0px_0px_1px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.04)]">
          <div className="flex w-[100px] items-center justify-between rounded-full border border-neutro-5 bg-white p-1">
            <button
              type="button"
              aria-label={`Restar ${product.name}`}
              onClick={handleDecrease}
              className="flex h-6 w-6 items-center justify-center"
            >
              <MinusIcon className="h-4 w-4 text-ink-9" />
            </button>
            <span className="text-xs font-medium text-ink-9">{quantity}</span>
            <button
              type="button"
              aria-label={`Sumar ${product.name}`}
              onClick={() => cart.updateQuantity(product.id, 1)}
              className="flex h-6 w-6 items-center justify-center"
            >
              <PlusIcon className="h-4 w-4 text-ink-9" />
            </button>
          </div>
          <div className="flex w-full flex-col items-center gap-2 px-1 pt-1 pb-2">
            <p className="text-center text-[10px] text-[#5d6673]">Madurez:</p>
            {ripenessOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setRipeness(option)}
                className={`flex w-full items-center justify-center rounded-full border px-3 py-1 text-[10px] whitespace-nowrap ${
                  cartItem?.ripeness === option ? "border-brand text-brand" : "border-[#c4c4c4] text-[#5d6673]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : quantity > 0 ? (
        <div className="absolute top-[3px] right-[3px] flex w-[100px] items-center justify-between rounded-full border border-neutro-5 bg-white p-1">
          <button
            type="button"
            aria-label={`Restar ${product.name}`}
            onClick={handleDecrease}
            className="flex h-6 w-6 items-center justify-center"
          >
            <MinusIcon className="h-4 w-4 text-ink-9" />
          </button>
          <span className="text-xs font-medium text-ink-9">{quantity}</span>
          <button
            type="button"
            aria-label={`Sumar ${product.name}`}
            onClick={() => cart.updateQuantity(product.id, 1)}
            className="flex h-6 w-6 items-center justify-center"
          >
            <PlusIcon className="h-4 w-4 text-ink-9" />
          </button>
        </div>
      ) : null}
      {quantity === 0 && (
        <button
          type="button"
          aria-label={`Agregar ${product.name}`}
          onClick={handleAdd}
          className="absolute top-[3px] right-[3px] flex items-center justify-center rounded-full border border-ink-9 bg-ink-9 p-2 text-white shadow-sm"
        >
          <PlusIcon className="h-3.5 w-3.5" />
        </button>
      )}
      <p className="text-sm font-semibold text-[#232321]">{formatPrice(product.price)}</p>
      <p className="text-center text-xs text-ink-6" style={{ lineHeight: 1.7 }}>
        {product.name} {product.unit.replace("1 unidad", "1 un.")}
      </p>
    </div>
  );
}
