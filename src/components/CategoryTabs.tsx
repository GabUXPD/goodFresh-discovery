"use client";

export const CATEGORY_TABS = ["Ver todos", "Verduras", "Frutas", "Frutos secos"] as const;
export type CategoryTab = (typeof CATEGORY_TABS)[number];

export function CategoryTabs({
  active,
  onChange,
}: {
  active: CategoryTab;
  onChange: (tab: CategoryTab) => void;
}) {
  return (
    <div className="flex gap-6 border-b border-neutro-5 px-4">
      {CATEGORY_TABS.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className={`-mb-px border-b-2 pb-3 text-sm font-semibold transition-colors ${
              isActive ? "border-ink-9 text-ink-9" : "border-transparent text-neutro-8"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
