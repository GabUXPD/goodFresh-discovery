"use client";

import { useEffect, useState } from "react";
import { BellIcon, ChevronLeftIcon } from "./icons";
import { HeaderCartButton } from "./HeaderCartButton";

// Alto de la foto de portada (src/app/page.tsx): el header pasa a fondo
// blanco una vez que se hace scroll más allá de ella.
const HERO_HEIGHT = 160;

export function StoreHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > HERO_HEIGHT);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-20 mx-auto flex w-full max-w-[430px] items-center justify-between p-4 ${
        isScrolled ? "bg-white" : "bg-transparent"
      }`}
    >
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
  );
}
