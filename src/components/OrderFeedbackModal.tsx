"use client";

import { useState } from "react";
import Image from "next/image";
import { StarIcon, CheckIcon } from "@/components/icons";
import type { CartItem } from "@/context/CartContext";

const MODAL_TRANSITION_MS = 300;

type ProductFollowUp = { type: "products"; question: string; hint: string };
type TextFollowUp = { type: "text"; placeholder?: string };
type FollowUp = ProductFollowUp | TextFollowUp;

type TagConfig = {
  id: string;
  label: string;
  followUp?: FollowUp;
  /** "auto" = crédito/reembolso instantáneo; "support" = se deriva a soporte con evidencia; sin definir = mensaje genérico */
  resolutionRoute?: "auto" | "support";
};

type RatingConfig = {
  question: string;
  hint: string;
  defaultPlaceholder: string;
  tags: TagConfig[];
};

const PRODUCT_TAGS_1: TagConfig[] = [
  {
    id: "faltaron",
    label: "Faltaron productos",
    followUp: { type: "products", question: "¿Qué productos te faltaron?", hint: "Selecciona de tu pedido los que no te llegaron" },
    resolutionRoute: "auto",
  },
  {
    id: "no-elegido",
    label: "Llegó algo que no elegí",
    followUp: { type: "text", placeholder: "¿Qué producto te llegó que no elegiste?" },
    resolutionRoute: "support",
  },
  { id: "fuera-horario", label: "Llegó fuera de horario", followUp: { type: "text" } },
  {
    id: "mal-estado",
    label: "Productos en mal estado",
    followUp: { type: "products", question: "¿Qué productos te llegaron así?", hint: "Selecciona de tu pedido los que correspondan" },
    resolutionRoute: "auto",
  },
  {
    id: "muy-verdes",
    label: "Muy verdes o muy maduros",
    followUp: { type: "products", question: "¿Qué productos te llegaron así?", hint: "Selecciona de tu pedido los que correspondan" },
    resolutionRoute: "support",
  },
  { id: "otro", label: "Otro", followUp: { type: "text" } },
];

const PRODUCT_TAGS_3: TagConfig[] = [
  {
    id: "frescura",
    label: "Frescura de algunos productos",
    followUp: { type: "products", question: "¿A que productos?", hint: "Selecciona de tu pedido los que correspondan" },
    resolutionRoute: "support",
  },
  {
    id: "madurez",
    label: "Punto de madurez",
    followUp: { type: "products", question: "¿A que productos?", hint: "Selecciona de tu pedido los que correspondan" },
    resolutionRoute: "support",
  },
  {
    id: "tamano",
    label: "Tamaño de los productos",
    followUp: { type: "products", question: "¿A que productos?", hint: "Selecciona de tu pedido los que correspondan" },
    resolutionRoute: "support",
  },
  { id: "horario", label: "Horario de entrega", followUp: { type: "text" } },
  { id: "empacado", label: "Cómo llegó empacado", followUp: { type: "text" } },
  { id: "precio", label: "Precio", followUp: { type: "text" } },
];

const RATING_CONFIG: Record<number, RatingConfig> = {
  1: {
    question: "¿Qué pasó?",
    hint: "Puedes elegir más de una",
    defaultPlaceholder: "Cuéntanos qué pasó (opcional)",
    tags: PRODUCT_TAGS_1,
  },
  2: {
    question: "¿Qué falló?",
    hint: "Puedes elegir más de una",
    defaultPlaceholder: "Cuéntanos qué pasó (opcional)",
    tags: PRODUCT_TAGS_1,
  },
  3: {
    question: "¿Qué mejorarías?",
    hint: "Puedes elegir más de una",
    defaultPlaceholder: "¿Algo más que contarnos? (opcional)",
    tags: PRODUCT_TAGS_3,
  },
  4: {
    question: "¿Qué le faltó para ser perfecto?",
    hint: "Puedes elegir más de una",
    defaultPlaceholder: "¿Algo más que contarnos? (opcional)",
    tags: [...PRODUCT_TAGS_3, { id: "nada", label: "Nada, estuvo muy bien" }],
  },
  5: {
    question: "¿Qué destacarías?",
    hint: "Opcional · puedes elegir más de una",
    defaultPlaceholder: "¿Algo más que contarnos? (opcional)",
    tags: [
      { id: "frescos", label: "Productos frescos" },
      { id: "madurez-buena", label: "Buen punto de madurez" },
      { id: "eligio", label: "Llegó lo que elegí" },
      { id: "tiempo", label: "Llegó a tiempo" },
      { id: "empacado-bien", label: "Bien empacado" },
      { id: "precio-bueno", label: "Buen precio" },
    ],
  },
};

type Step = "rating" | "resolution" | "photo";
type ResolutionChoice = "credit" | "refund";

type OrderFeedbackModalProps = {
  open: boolean;
  onClose: () => void;
  products: CartItem[];
};

function formatPrice(value: number) {
  return `$${new Intl.NumberFormat("es-CL").format(value)}`;
}

function ProductChecklist({
  question,
  hint,
  products,
  selected,
  onToggle,
}: {
  question: string;
  hint: string;
  products: CartItem[];
  selected: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl bg-neutro-3 p-4">
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-semibold text-ink-9">{question}</p>
        <p className="text-xs text-neutro-9">{hint}</p>
      </div>
      {products.map((product) => {
        const isChecked = selected.has(product.id);
        return (
          <button
            key={product.id}
            type="button"
            onClick={() => onToggle(product.id)}
            className="flex w-full items-center gap-3 text-left"
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] ${
                isChecked ? "bg-brand" : "border-[1.5px] border-ink-2 bg-white"
              }`}
            >
              {isChecked && <CheckIcon className="h-3 w-3 text-white" />}
            </span>
            <span className="text-sm text-ink-9">
              {product.quantity} {product.name} - {product.unit}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function OrderFeedbackModal({ open, onClose, products }: OrderFeedbackModalProps) {
  const [closing, setClosing] = useState(false);
  const [step, setStep] = useState<Step>("rating");
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [checkedProducts, setCheckedProducts] = useState<Set<string>>(new Set());
  const [comment, setComment] = useState("");
  const [lastTextTagId, setLastTextTagId] = useState<string | null>(null);
  const [lastProductTagId, setLastProductTagId] = useState<string | null>(null);
  const [resolutionChoice, setResolutionChoice] = useState<ResolutionChoice | null>(null);
  const [resolutionConfirmed, setResolutionConfirmed] = useState(false);

  if (!open) return null;

  const config = rating > 0 ? RATING_CONFIG[rating] : null;

  function resetState() {
    setStep("rating");
    setRating(0);
    setSelectedTags(new Set());
    setCheckedProducts(new Set());
    setComment("");
    setLastTextTagId(null);
    setLastProductTagId(null);
    setResolutionChoice(null);
    setResolutionConfirmed(false);
  }

  function requestClose() {
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
      resetState();
    }, MODAL_TRANSITION_MS);
  }

  function toggleTag(tag: TagConfig) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag.id)) {
        next.delete(tag.id);
      } else {
        next.add(tag.id);
        if (tag.followUp?.type === "text") setLastTextTagId(tag.id);
        if (tag.followUp?.type === "products") setLastProductTagId(tag.id);
      }
      return next;
    });
  }

  function toggleProduct(productId: string) {
    setCheckedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  }

  const activeProductTags = config?.tags.filter((tag) => selectedTags.has(tag.id) && tag.followUp?.type === "products") ?? [];
  const activeProductTag =
    activeProductTags.find((tag) => tag.id === lastProductTagId) ?? activeProductTags[activeProductTags.length - 1];
  const activeTextTag = config?.tags.find((tag) => tag.id === lastTextTagId && selectedTags.has(tag.id) && tag.followUp?.type === "text");
  const textPlaceholder =
    activeTextTag?.followUp?.type === "text" && activeTextTag.followUp.placeholder
      ? activeTextTag.followUp.placeholder
      : config?.defaultPlaceholder;

  const hasPendingProductSelection = activeProductTags.length > 0 && checkedProducts.size === 0;
  const canSubmit = rating > 0 && !hasPendingProductSelection;

  const affectedProducts = products.filter((product) => checkedProducts.has(product.id));
  const affectedAmount = affectedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);

  const selectedConfigTags = config?.tags.filter((tag) => selectedTags.has(tag.id)) ?? [];
  const resolutionRoute: "auto" | "support" | "generic" = selectedConfigTags.some((tag) => tag.resolutionRoute === "support")
    ? "support"
    : selectedConfigTags.some((tag) => tag.resolutionRoute === "auto") && affectedAmount > 0
      ? "auto"
      : "generic";

  function handleSubmit() {
    if (!canSubmit) return;
    setStep(rating >= 4 ? "photo" : "resolution");
  }

  return (
    <div className="fixed inset-0 z-40 mx-auto flex w-full max-w-[430px] items-end px-4 pb-4">
      <button type="button" aria-label="Cerrar" onClick={requestClose} className="absolute inset-0 bg-black/40" />
      <div
        className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-[24px] bg-white pt-2 shadow-xl"
        style={{
          animation: `${closing ? "sheet-slide-down" : "sheet-slide-up"} ${MODAL_TRANSITION_MS}ms cubic-bezier(0.2, 0.9, 0.3, 1) forwards`,
        }}
      >
        <div className="h-[5px] w-[134px] shrink-0 self-center rounded-full bg-[#232321]" />

        {step === "rating" && (
          <>
            <div className="flex w-full flex-col items-center gap-4 overflow-y-auto px-4 pt-4 pb-4">
              <div className="flex flex-col items-center gap-0.5">
                <p className="text-center text-base font-semibold text-ink-9">¿Cómo estuvo tu pedido?</p>
                <p className="text-center text-xs text-neutro-9">Tienes 24 horas desde la entrega para contarnos</p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button key={value} type="button" onClick={() => setRating(value)} aria-label={`${value} estrella${value > 1 ? "s" : ""}`}>
                      <StarIcon filled={value <= rating} className={`h-7 w-8 ${value <= rating ? "text-brand" : "text-ink-2"}`} />
                    </button>
                  ))}
                </div>
                {rating === 0 && <p className="text-xs font-medium text-neutro-9">Toca una estrella para calificar</p>}
              </div>

              {config && (
                <>
                  <div className="flex w-full flex-col items-center gap-1 text-center">
                    <p className="text-base font-semibold text-ink-9">{config.question}</p>
                    <p className="text-xs text-neutro-9">{config.hint}</p>
                  </div>

                  <div className="flex w-full flex-wrap items-start justify-center gap-2">
                    {config.tags.map((tag) => {
                      const isSelected = selectedTags.has(tag.id);
                      return (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`tap-scale rounded-full border px-4 py-3 text-xs font-medium ${
                            isSelected ? "border-brand bg-brand-1 text-brand" : "border-neutro-5 bg-white text-ink-9"
                          }`}
                        >
                          {tag.label}
                        </button>
                      );
                    })}
                  </div>

                  {activeProductTag?.followUp?.type === "products" && (
                    <ProductChecklist
                      question={activeProductTag.followUp.question}
                      hint={activeProductTag.followUp.hint}
                      products={products}
                      selected={checkedProducts}
                      onToggle={toggleProduct}
                    />
                  )}

                  <input
                    type="text"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder={textPlaceholder}
                    className="w-full rounded-full border border-neutro-5 px-4 py-3 text-sm text-ink-9 outline-none placeholder:text-neutro-8"
                  />
                </>
              )}
            </div>

            <div className="w-full shrink-0 border-t border-neutro-4 px-4 pt-3 pb-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="tap-scale flex w-full items-center justify-center rounded-full bg-brand px-4 py-3 text-base font-medium text-white shadow-sm disabled:bg-neutro-3 disabled:text-[#979797] disabled:shadow-none"
              >
                Enviar
              </button>
            </div>
          </>
        )}

        {step === "resolution" && (
          <div className="flex w-full flex-col items-center gap-6 overflow-y-auto px-4 pt-4 pb-4">
            {resolutionRoute === "generic" && (
              <>
                <div className="flex w-full flex-col items-center gap-2 pt-6 text-center">
                  <p className="text-base font-semibold text-ink-9">Gracias por avisarnos</p>
                  <p className="text-sm text-ink-5">Tomamos nota de tu comentario para mejorar tu próxima entrega.</p>
                </div>
                <div className="flex w-full gap-2">
                  <button
                    type="button"
                    onClick={requestClose}
                    className="tap-scale flex flex-1 items-center justify-center rounded-full border border-brand px-6 py-4 text-base font-medium text-brand"
                  >
                    Hablar con soporte
                  </button>
                  <button
                    type="button"
                    onClick={requestClose}
                    className="tap-scale flex flex-1 items-center justify-center rounded-full bg-brand px-6 py-4 text-base font-medium text-white shadow-sm"
                  >
                    Entendido
                  </button>
                </div>
              </>
            )}

            {resolutionRoute === "auto" &&
              (!resolutionConfirmed ? (
                <>
                  <div className="flex w-full flex-col items-center gap-2 text-center">
                    <p className="text-base font-semibold text-ink-9">Identificamos un problema con:</p>
                    <div className="flex flex-col items-center gap-0.5">
                      {affectedProducts.map((product) => (
                        <p key={product.id} className="text-sm text-ink-5">
                          {product.quantity} {product.name} - {product.unit}
                        </p>
                      ))}
                    </div>
                    <p className="text-2xl font-bold text-brand">{formatPrice(affectedAmount)}</p>
                  </div>

                  <p className="text-sm font-semibold text-ink-9">¿Cómo prefieres que lo resolvamos?</p>

                  <div className="flex w-full flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setResolutionChoice("credit")}
                      className={`flex w-full flex-col items-start gap-0.5 rounded-2xl border px-4 py-3 text-left ${
                        resolutionChoice === "credit" ? "border-brand bg-brand-1" : "border-neutro-5 bg-white"
                      }`}
                    >
                      <p className="text-sm font-semibold text-ink-9">Crédito GoodClub</p>
                      <p className="text-xs text-neutro-9">Disponible al instante para tu próxima compra</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setResolutionChoice("refund")}
                      className={`flex w-full flex-col items-start gap-0.5 rounded-2xl border px-4 py-3 text-left ${
                        resolutionChoice === "refund" ? "border-brand bg-brand-1" : "border-neutro-5 bg-white"
                      }`}
                    >
                      <p className="text-sm font-semibold text-ink-9">Reembolso a tu medio de pago</p>
                      <p className="text-xs text-neutro-9">Hasta 5 días hábiles</p>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setResolutionConfirmed(true)}
                    disabled={!resolutionChoice}
                    className="tap-scale flex w-full items-center justify-center rounded-full bg-brand px-4 py-3 text-base font-medium text-white shadow-sm disabled:bg-neutro-3 disabled:text-[#979797] disabled:shadow-none"
                  >
                    Confirmar
                  </button>
                </>
              ) : (
                <>
                  <div className="flex w-full flex-col items-center gap-2 pt-6 text-center">
                    <p className="text-2xl font-bold text-ink-9">¡Listo! 🎉</p>
                    <p className="text-sm text-ink-5">
                      {resolutionChoice === "credit"
                        ? `Agregamos ${formatPrice(affectedAmount)} a tu saldo GoodClub.`
                        : `Tu reembolso de ${formatPrice(affectedAmount)} está en camino, lo verás reflejado en máximo 5 días hábiles.`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={requestClose}
                    className="tap-scale flex w-full items-center justify-center rounded-full bg-brand px-4 py-3 text-base font-medium text-white shadow-sm"
                  >
                    Entendido
                  </button>
                </>
              ))}

            {resolutionRoute === "support" &&
              (!resolutionConfirmed ? (
                <>
                  <div className="flex w-full flex-col items-center gap-2 text-center">
                    <p className="text-base font-semibold text-ink-9">Ayúdanos a revisar tu caso</p>
                    <p className="text-sm text-ink-5">Una foto nos ayuda a validar tu reclamo más rápido (opcional).</p>
                  </div>

                  <div className="flex w-full flex-col items-center gap-2 pb-1">
                    <div className="relative h-[173px] w-[288px]">
                      <Image src="/images/goodclub-photo-frame.png" alt="" fill className="object-contain" />
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center text-xs text-brand">
                      <p className="font-semibold">📸 Muestra claramente el problema (madurez, tamaño, etc.)</p>
                      <p>🏷️ Si es posible, incluye la etiqueta o precio</p>
                    </div>
                  </div>

                  <div className="flex w-full gap-2">
                    <button
                      type="button"
                      onClick={() => setResolutionConfirmed(true)}
                      className="tap-scale flex flex-1 items-center justify-center rounded-full border border-brand px-6 py-4 text-base font-medium text-brand"
                    >
                      Continuar sin foto
                    </button>
                    <button
                      type="button"
                      onClick={() => setResolutionConfirmed(true)}
                      className="tap-scale flex flex-1 items-center justify-center rounded-full bg-brand px-6 py-4 text-base font-medium text-brand-1 shadow-sm"
                    >
                      Subir foto
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex w-full flex-col items-center gap-2 pt-6 text-center">
                    <p className="text-2xl font-bold text-ink-9">¡Caso enviado! 📩</p>
                    <p className="text-sm text-ink-5">
                      Enviamos tu caso a soporte GoodClub. Te contactaremos dentro de las próximas 24 horas con una solución.
                    </p>
                    {affectedAmount > 0 && (
                      <p className="text-sm text-ink-5">
                        Ya identificamos {formatPrice(affectedAmount)} en productos reportados — lo confirmaremos junto con el resto de tu
                        caso.
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={requestClose}
                    className="tap-scale flex w-full items-center justify-center rounded-full bg-brand px-4 py-3 text-base font-medium text-white shadow-sm"
                  >
                    Entendido
                  </button>
                </>
              ))}
          </div>
        )}

        {step === "photo" && (
          <div className="flex w-full flex-col items-center gap-6 overflow-y-auto px-4 pt-4 pb-4">
            <div className="flex w-full flex-col items-start gap-0.5 text-ink-5">
              <p className="text-base font-semibold">Tu experiencia GoodClub en:</p>
              <p className="text-base">GoodFresh</p>
            </div>
            <div className="h-px w-full bg-neutro-4" />

            <div className="flex w-full flex-col items-center gap-2 text-center text-ink-5">
              <p className="text-base">
                <span className="font-bold">¡Gracias por tu compra! </span>
                <br />
                <span className="text-sm">¿Quieres compartir cómo se ve tu compra? </span>
              </p>
              <p className="text-xs">📸 ¡Tu foto ayuda a otros compradores como tú!</p>
            </div>

            <div className="flex w-full flex-col items-center gap-2 pb-1">
              <div className="relative h-[173px] w-[288px]">
                <Image src="/images/goodclub-photo-frame.png" alt="" fill className="object-contain" />
              </div>
              <div className="flex flex-col items-center gap-1 text-center text-xs text-brand">
                <p>Consejo rápido:</p>
                <p className="font-semibold">📦 Si sacas el producto de la caja se verá mejor</p>
                <p>👀 Asegúrate de que se vean claramente</p>
                <p>💡 Intenta tomar las fotos con buena iluminación</p>
              </div>
            </div>

            <div className="flex w-full gap-2 pb-2">
              <button
                type="button"
                onClick={requestClose}
                className="tap-scale flex flex-1 items-center justify-center rounded-full border border-brand px-6 py-4 text-base font-medium text-brand"
              >
                Subir más tarde
              </button>
              <button
                type="button"
                onClick={requestClose}
                className="tap-scale flex flex-1 items-center justify-center rounded-full bg-brand px-6 py-4 text-base font-medium text-brand-1 shadow-sm"
              >
                Subir foto
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
