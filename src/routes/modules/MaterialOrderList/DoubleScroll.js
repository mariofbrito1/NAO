import React, { useRef, useLayoutEffect } from "react";

export default function DoubleScroll({ children, barHeight = 14 }) {
  const topRef = useRef(null);        // barra de arriba (div con overflow-x)
  const ghostRef = useRef(null);      // div fantasma cuyo width = scrollWidth real
  const bottomRef = useRef(null);     // << debe ser el TableContainer real

  // Mantener sincronía
  const onTopScroll = e => {
    if (bottomRef.current) bottomRef.current.scrollLeft = e.currentTarget.scrollLeft;
  };
  const onBottomScroll = e => {
    if (topRef.current) topRef.current.scrollLeft = e.currentTarget.scrollLeft;
  };

  // Ajustar ancho del “fantasma” al contenido real
  const updateGhostWidth = () => {
    if (!bottomRef.current || !ghostRef.current) return;
    ghostRef.current.style.width = `${bottomRef.current.scrollWidth}px`;
  };

  useLayoutEffect(() => {
    updateGhostWidth();

    // Recalcular cuando cambie el tamaño
    const ro = new ResizeObserver(updateGhostWidth);
    if (bottomRef.current) ro.observe(bottomRef.current);
    window.addEventListener("resize", updateGhostWidth);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateGhostWidth);
    };
  }, []);

  // Render-prop: te paso ref y onScroll para el contenedor real (TableContainer)
  return (
    <div>
      <div
        ref={topRef}
        onScroll={onTopScroll}
        style={{ overflowX: "auto", overflowY: "hidden", height: barHeight, marginBottom: 6 }}
      >
        <div ref={ghostRef} style={{ height: 1 }} />
      </div>

      {typeof children === "function"
        ? children(bottomRef, onBottomScroll)
        : <div ref={bottomRef} onScroll={onBottomScroll} style={{ overflowX: "auto" }}>{children}</div>}
    </div>
  );
}
