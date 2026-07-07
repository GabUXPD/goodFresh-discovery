"use client";

import Image from "next/image";
import { MinusIcon, PlusIcon } from "./icons";
import { useCart } from "@/context/CartContext";

export type Product = {
  id: string;
  name: string;
  unit: string;
  image: string;
  price: number;
  cashback?: string;
};

function formatPrice(value: number) {
  return `$${new Intl.NumberFormat("es-CL").format(value)}`;
}

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const quantity = cart.items.find((item) => item.id === product.id)?.quantity ?? 0;

  function handleAdd() {
    cart.setItems((items) => [
      ...items,
      { id: product.id, name: product.name, unit: product.unit, price: product.price, image: product.image, quantity: 1 },
    ]);
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
      {quantity > 0 ? (
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
      ) : (
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
