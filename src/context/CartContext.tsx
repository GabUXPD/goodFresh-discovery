"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  unit: string;
  price: number;
  image: string;
  quantity: number;
  badge?: string;
  ripeness?: "Para hoy" | "2 - 3 días";
};

type CartContextValue = {
  items: CartItem[];
  setItems: (items: CartItem[] | ((current: CartItem[]) => CartItem[])) => void;
  updateQuantity: (id: string, delta: number) => void;
  total: number;
  selectedAddressId: string;
  setSelectedAddressId: (id: string) => void;
  activeBoxId: string | null;
  setActiveBoxId: (id: string | null) => void;
  lastOrder: CartItem[] | null;
  lastOrderBoxId: string | null;
  saveLastOrder: () => void;
  repeatLastOrder: () => void;
  isRepeatOrder: boolean;
  setIsRepeatOrder: (value: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("casa");
  const [activeBoxId, setActiveBoxId] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<CartItem[] | null>(null);
  const [lastOrderBoxId, setLastOrderBoxId] = useState<string | null>(null);
  const [isRepeatOrder, setIsRepeatOrder] = useState(false);

  function updateQuantity(id: string, delta: number) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
    );
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function saveLastOrder() {
    setLastOrder(items);
    setLastOrderBoxId(activeBoxId);
    setIsRepeatOrder(false);
  }

  function repeatLastOrder() {
    if (!lastOrder) return;
    setItems(lastOrder);
    setActiveBoxId(lastOrderBoxId);
    setIsRepeatOrder(true);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        setItems,
        updateQuantity,
        total,
        selectedAddressId,
        setSelectedAddressId,
        activeBoxId,
        setActiveBoxId,
        lastOrder,
        lastOrderBoxId,
        saveLastOrder,
        repeatLastOrder,
        isRepeatOrder,
        setIsRepeatOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
