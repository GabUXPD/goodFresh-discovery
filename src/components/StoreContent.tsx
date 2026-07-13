"use client";

import { useState } from "react";
import { EyeIcon } from "./icons";
import { CategoryTabs, type CategoryTab } from "./CategoryTabs";
import { BoxCard, type Box } from "./BoxCard";
import { type Product } from "./ProductCard";
import { ProductGrid } from "./ProductGrid";
import { RepeatOrderBanner } from "./RepeatOrderBanner";

// Las pestañas "Verduras", "Frutas" y "Frutos secos" reutilizan el mismo
// diseño de la sección "O elige producto a producto" (buscador + grilla),
// cada una cargada solo con los productos de esa categoría.

const CATEGORY_PRODUCTS: Partial<Record<CategoryTab, "vegetables" | "fruits" | "nuts">> = {
  Verduras: "vegetables",
  Frutas: "fruits",
  "Frutos secos": "nuts",
};

export function StoreContent({
  boxes,
  products,
  vegetables,
  fruits,
  nuts,
}: {
  boxes: Box[];
  products: Product[];
  vegetables: Product[];
  fruits: Product[];
  nuts: Product[];
}) {
  const [activeTab, setActiveTab] = useState<CategoryTab>("Ver todos");
  const categoryKey = CATEGORY_PRODUCTS[activeTab];
  const categoryProducts =
    categoryKey === "vegetables" ? vegetables : categoryKey === "fruits" ? fruits : categoryKey === "nuts" ? nuts : null;

  return (
    <>
      <div className="mt-4">
        <CategoryTabs active={activeTab} onChange={setActiveTab} />
      </div>

      {categoryProducts ? (
        <section className="flex flex-col gap-3 px-4 py-4">
          <ProductGrid products={categoryProducts} />
          <div className="flex items-center justify-center gap-1">
            <EyeIcon className="h-3 w-3 text-brand" />
            <p className="text-xs text-brand">+10 personas mirando</p>
          </div>
        </section>
      ) : (
        <>
          <div className="px-4 pt-3">
            <RepeatOrderBanner />
          </div>

          {/* Arma tu pedido */}
          <section className="flex flex-col gap-3 bg-neutro-3 py-4">
            <div className="px-4">
              <h2 className="text-base font-bold text-ink-9">Arma tu pedido como quieras</h2>
              <p className="text-[14px] text-neutro-8">Te proponemos el punto de partida, tú ajustas lo que necesitas</p>
            </div>
            <div className="flex gap-2 overflow-x-auto px-4 pb-2">
              {boxes.map((box) => (
                <BoxCard key={box.name} box={box} />
              ))}
            </div>
          </section>

          {/* Producto a producto */}
          <section id="producto-a-producto" className="flex flex-col gap-3 px-4 py-4">
            <h2 className="text-base font-bold text-ink-9">O elige producto a producto</h2>
            <ProductGrid products={products} />
            <div className="flex items-center justify-center gap-1">
              <EyeIcon className="h-3 w-3 text-brand" />
              <p className="text-xs text-brand">+10 personas mirando</p>
            </div>
          </section>
        </>
      )}
    </>
  );
}
