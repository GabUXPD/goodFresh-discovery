"use client";

import { useEffect, useRef, useState } from "react";
import { ProductCard, type Product } from "./ProductCard";
import { CloseIcon, SearchIcon } from "./icons";
import { normalize } from "@/lib/normalize";

const PAGE_SIZE = 12;

export function ProductGrid({ products }: { products: Product[] }) {
  const [visibleCount, setVisibleCount] = useState(Math.min(PAGE_SIZE, products.length));
  const [query, setQuery] = useState("");
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((count) => Math.min(count + PAGE_SIZE, products.length));
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [products.length]);

  const isSearching = query.trim().length > 0;
  const searchResults = isSearching ? products.filter((p) => normalize(p.name).includes(normalize(query))) : [];
  const visibleProducts = isSearching ? searchResults : products.slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full items-center gap-1 rounded-full border border-neutro-4 bg-white py-0.5 pr-2 pl-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar producto"
          className="flex-1 bg-transparent text-xs text-ink-9 placeholder:text-neutro-8 focus:outline-none"
        />
        {isSearching ? (
          <button
            type="button"
            aria-label="Limpiar búsqueda"
            onClick={() => setQuery("")}
            className="flex items-center justify-center rounded-full p-1"
          >
            <CloseIcon className="h-3 w-3 text-neutro-8" />
          </button>
        ) : (
          <div className="flex items-center justify-center rounded-full p-1">
            <SearchIcon className="h-4 w-4 text-neutro-8" />
          </div>
        )}
      </div>

      {isSearching && searchResults.length === 0 && (
        <p className="text-center text-[10px] text-neutro-8">No encontramos productos con ese nombre.</p>
      )}

      <div className="grid grid-cols-3 gap-2">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {!isSearching && visibleCount < products.length && <div ref={sentinelRef} className="col-span-3 h-1" />}
      </div>
    </div>
  );
}
