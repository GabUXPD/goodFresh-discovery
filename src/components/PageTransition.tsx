"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

// Transición de pantalla estilo iOS: al avanzar (cualquier navegación que no
// sea el botón atrás del navegador), la pantalla nueva entra deslizándose
// desde la derecha. Al retroceder con el botón/gesto atrás real del
// navegador (evento "popstate"), se clona el DOM de la pantalla saliente y
// se anima deslizándose hacia afuera por la derecha, revelando la pantalla
// de destino (que no lleva animación propia) debajo. No se anima nada del
// contenido interno de cada página, solo el contenedor de la página completa.

const TRANSITION_MS = 300;
const TRANSITION_EASING = "cubic-bezier(0.2, 0.9, 0.3, 1)";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const ghostHostRef = useRef<HTMLDivElement>(null);
  const prevPathnameRef = useRef(pathname);
  const isBackNavigationRef = useRef(false);

  useEffect(() => {
    function handlePopState() {
      isBackNavigationRef.current = true;

      const container = containerRef.current;
      const ghostHost = ghostHostRef.current;
      if (!container || !ghostHost) return;

      // Se clona el DOM actual (aún es la pantalla saliente en este punto)
      // para poder animarlo saliendo, mientras React monta la pantalla de
      // destino por debajo sin necesidad de volver a montar componentes.
      const clone = container.cloneNode(true) as HTMLElement;
      clone.style.position = "absolute";
      clone.style.inset = "0";
      clone.style.animation = `page-slide-out-right ${TRANSITION_MS}ms ${TRANSITION_EASING} forwards`;
      ghostHost.appendChild(clone);

      window.setTimeout(() => {
        clone.remove();
      }, TRANSITION_MS);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (pathname === prevPathnameRef.current) return;
    prevPathnameRef.current = pathname;

    if (isBackNavigationRef.current) {
      // El "fantasma" de la pantalla anterior ya se está animando por
      // encima; la pantalla de destino no lleva animación de entrada.
      isBackNavigationRef.current = false;
      return;
    }

    const container = containerRef.current;
    if (!container) return;
    container.style.animation = "none";
    // Forzar reflow para poder reiniciar la animación en cada navegación.
    void container.offsetWidth;
    container.style.animation = `page-slide-in-right ${TRANSITION_MS}ms ${TRANSITION_EASING}`;
  }, [pathname]);

  return (
    <div className="relative flex flex-1 flex-col">
      <div ref={containerRef} className="flex flex-1 flex-col">
        {children}
      </div>
      <div ref={ghostHostRef} className="pointer-events-none absolute inset-0 z-50" />
    </div>
  );
}
