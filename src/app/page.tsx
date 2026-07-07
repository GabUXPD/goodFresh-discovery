import Image from "next/image";
import { BellIcon, ChevronLeftIcon, CoinsIcon, DeliveryIcon, LeafIcon } from "@/components/icons";
import { type Box } from "@/components/BoxCard";
import { type Product } from "@/components/ProductCard";
import { BottomCartBar } from "@/components/BottomCartBar";
import { HeaderCartButton } from "@/components/HeaderCartButton";
import { StoreContent } from "@/components/StoreContent";
import { catalog } from "@/data/catalog";

// Contenido y visibilidad verificados directamente contra los nodos del Figma
// "Tienda GoodFresh" (node-id 294-3123, archivo "Nuevos negocios") — solo se
// incluye lo que efectivamente se renderiza en el diseño (varias secciones
// están marcadas hidden="true" en Figma y no se muestran aquí).

const boxes: Box[] = [
  { name: "Caja esencial ensaladas", image: "/images/cajaVerduras.png", price: "$12.000", itemCount: "5 tipos de productos", cashback: "$550", href: "/caja-ensaladas" },
  { name: "Caja esencial frutas", image: "/images/cajaFrutas.png", price: "$11.587", itemCount: "4 tipos de productos", cashback: "$550", href: "/caja-frutas" },
  { name: "Caja esencial completa", image: "/images/cajaCompleta.png", price: "$33.460", itemCount: "17 tipos de productos", cashback: "$1.750", href: "/caja-completa" },
];

// Cashback verificado en Figma para estos 4 productos; el resto usa el
// monto por defecto ($20) que pediste para que todas las cards tengan pill.
const cashbackById: Record<string, string> = {
  acelga: "$80",
  "alcachofas-espanolas": "$70",
  brocoli: "$70",
};
const DEFAULT_CASHBACK = "$20";

function toProduct(p: (typeof catalog)[number]): Product {
  return {
    id: p.id,
    name: p.name,
    unit: p.unit,
    image: p.image,
    price: p.price,
    cashback: cashbackById[p.id] ?? DEFAULT_CASHBACK,
  };
}

// "LP GF" lista verduras primero y frutas/frutos secos al final. Se mezclan
// proporcionalmente para que cada grupo de 12 traiga de ambos tipos.
function interleave<T>(a: T[], b: T[]): T[] {
  const result: T[] = [];
  let ai = 0;
  let bi = 0;
  while (ai < a.length || bi < b.length) {
    const aRatio = a.length ? ai / a.length : 1;
    const bRatio = b.length ? bi / b.length : 1;
    if (bi >= b.length || (ai < a.length && aRatio <= bRatio)) {
      result.push(a[ai++]);
    } else {
      result.push(b[bi++]);
    }
  }
  return result;
}

// "LP GF" lista verduras (índices 0-48), luego frutas (49-71) y frutos
// secos/derivados (72-73).
const vegetables = catalog.slice(0, 49).map(toProduct);
const fruits = catalog.slice(49, 72).map(toProduct);
const nuts = catalog.slice(72).map(toProduct);
const fruitsAndNuts = [...fruits, ...nuts];
const products: Product[] = interleave(vegetables, fruitsAndNuts);

export default function TiendaGoodFreshPage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Foto de portada + header flotante */}
      <div className="relative h-[195px] w-full shrink-0">
        <Image src="/images/portadaTienda.png" alt="Frutas y verduras frescas en la tienda GoodFresh" fill priority sizes="430px" className="object-cover" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <button
            type="button"
            aria-label="Volver"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink-9 shadow-sm"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Notificaciones"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink-9 shadow-sm"
            >
              <BellIcon className="h-5 w-5" />
            </button>
            <HeaderCartButton />
          </div>
        </div>
        <div className="absolute inset-x-4 bottom-3 flex w-fit items-center gap-1 rounded-full bg-amber-5 px-2 py-0.5 text-xs font-semibold text-neutro-9">
          <CoinsIcon className="h-3.5 w-3.5" />
          Gana Créditos GoodMeal
        </div>
      </div>

      {/* Info de la tienda */}
      <section className="flex flex-col px-4 pt-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-ink-9">GoodFresh</h1>
              <div className="flex flex-col justify-center rounded-br-[16px] bg-white py-0.5">
                <div className="flex items-center gap-1">
                  <LeafIcon className="h-3 w-3 text-[#22b573]" />
                  <p className="text-xs font-semibold whitespace-nowrap text-[#22b573]">100% frescos</p>
                </div>
                <p className="text-[8px] tracking-[0.4px] whitespace-nowrap text-neutro-9 uppercase">Calidad garantizada</p>
              </div>
            </div>

            <div className="flex items-stretch gap-2">
              <div className="w-1 shrink-0 rounded-[10px] bg-brand" />
              <p className="text-xs text-[#4b5563]" style={{ lineHeight: 1.7 }}>
                Frutas y verduras de primera selección,
                <br />
                directo de la vega a tu casa.
              </p>
            </div>
          </div>

          <div className="relative h-16 w-16 shrink-0">
            <Image src="/images/goodFresh-logo.png" alt="Logo GoodFresh" fill sizes="64px" className="object-contain" />
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between rounded-[12px] bg-neutro-3">
          <div className="flex items-center px-2 py-1">
            <div className="flex flex-col gap-0.5">
              <p className="text-xs text-ink-4" style={{ lineHeight: 1.7 }}>
                Lunes a sábado - envío: $2.990
              </p>
              <span className="w-fit rounded-full bg-brand-1 px-1.5 py-0.5 text-[10px] text-brand">Envío gratis desde $40.000</span>
            </div>
          </div>
          <div className="flex items-end gap-1.5 px-2 py-1">
            <div className="flex items-center rounded-[30px] bg-brand-1 p-1">
              <DeliveryIcon className="h-[19.5px] w-[24px] text-brand" />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-xs text-neutro-8" style={{ lineHeight: 1.7 }}>Entrega</p>
              <p className="text-xs font-medium text-ink-4">Hasta 24 hrs.</p>
            </div>
          </div>
        </div>
      </section>

      <StoreContent boxes={boxes} products={products} vegetables={vegetables} fruits={fruits} nuts={nuts} />

      <BottomCartBar />
    </main>
  );
}
