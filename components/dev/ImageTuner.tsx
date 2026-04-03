"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Crosshair, Copy, Check } from "lucide-react";

/* ═══════════════════════════════════════════════
   DEV-ONLY Image Tuner Overlay
   Drag to pan, scroll to zoom, copy CSS values.
   Only renders when NODE_ENV === "development".

   Site-wide off: floating crosshair button and per-cell overlays are disabled.
   Set IMAGE_TUNER_UI_ENABLED to true to turn the tuner back on in development.
   ═══════════════════════════════════════════════ */

const IMAGE_TUNER_UI_ENABLED = false;

interface TunerValues {
  posX: number;
  posY: number;
  scale: number;
}

interface CellOverlayProps {
  index: number;
  initialPos: string; // e.g. "50% 70%"
  initialScale: number;
  onUpdate: (index: number, values: TunerValues) => void;
}

const parsePos = (pos: string): [number, number] => {
  const parts = pos.split(/\s+/).map((p) => parseFloat(p));
  return [parts[0] ?? 50, parts[1] ?? 50];
};

/** Clipboard API is missing over HTTP (non-localhost) and in some embedded webviews. */
async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* fall through */
    }
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

const CellOverlay = ({ index, initialPos, initialScale, onUpdate }: CellOverlayProps) => {
  const [posX, setPosX] = useState(() => parsePos(initialPos)[0]);
  const [posY, setPosY] = useState(() => parsePos(initialPos)[1]);
  const [scale, setScale] = useState(initialScale);
  const [copied, setCopied] = useState(false);
  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onUpdate(index, { posX, posY, scale });
  }, [posX, posY, scale, index, onUpdate]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      lastMouse.current = { x: e.clientX, y: e.clientY };

      // ~0.5% per pixel of drag
      setPosX((prev) => Math.max(0, Math.min(100, prev - dx * 0.5)));
      setPosY((prev) => Math.max(0, Math.min(100, prev - dy * 0.5)));
    };

    const handleMouseUp = () => {
      dragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setScale((prev) => Math.round(Math.max(0.8, Math.min(3.0, prev + delta)) * 100) / 100);
  }, []);

  const copyValues = useCallback(() => {
    const px = Math.round(posX);
    const py = Math.round(posY);
    const s = scale.toFixed(2);
    const text = `objectPosition: "${px}% ${py}%", transform: "scale(${s})"`;
    void copyTextToClipboard(text).then((ok) => {
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
        return;
      }
      window.prompt("Clipboard unavailable — copy manually:", text);
    });
  }, [posX, posY, scale]);

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 z-30 cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
    >
      {/* Copy button — top right */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          copyValues();
        }}
        onMouseDown={(e) => e.stopPropagation()}
        className="absolute right-1.5 top-1.5 z-40 flex h-7 w-7 items-center justify-center rounded-md bg-black/70 text-white backdrop-blur-sm transition-colors hover:bg-black/90"
        title="Copy CSS values"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
      </button>

      {/* Live readout — bottom */}
      <div className="absolute bottom-1.5 left-1.5 right-1.5 z-40 rounded-md bg-black/70 px-2 py-1 font-mono text-[10px] text-white backdrop-blur-sm">
        pos: {Math.round(posX)}% {Math.round(posY)}% | scale: {scale.toFixed(2)}
      </div>

      {/* Crosshair indicator */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <Crosshair className="h-5 w-5 text-white/40" />
      </div>
    </div>
  );
};

/* ── Main Tuner Provider ── */

export interface ImageTunerState {
  enabled: boolean;
  values: Record<number, TunerValues>;
}

export const useImageTuner = () => {
  const [enabled, setEnabled] = useState(false);
  const [values, setValues] = useState<Record<number, TunerValues>>({});

  const toggle = useCallback(() => setEnabled((prev) => !prev), []);

  const handleUpdate = useCallback((index: number, v: TunerValues) => {
    setValues((prev) => ({ ...prev, [index]: v }));
  }, []);

  const getStyle = useCallback(
    (index: number, defaultPos: string, defaultScale: number) => {
      const v = values[index];
      if (!enabled || !v) {
        return { objectPosition: defaultPos, transform: `scale(${defaultScale})` };
      }
      return {
        objectPosition: `${Math.round(v.posX)}% ${Math.round(v.posY)}%`,
        transform: `scale(${v.scale})`,
      };
    },
    [enabled, values]
  );

  return { enabled, toggle, handleUpdate, getStyle };
};

/* ── Toggle Button ── */
export const TunerToggle = ({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) => {
  if (!IMAGE_TUNER_UI_ENABLED || process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-colors ${
        enabled
          ? "bg-violet-600 text-white ring-2 ring-violet-300"
          : "bg-card text-muted-foreground border border-border hover:bg-secondary"
      }`}
      title={enabled ? "Disable image tuner" : "Enable image tuner"}
    >
      <Crosshair className="h-5 w-5" />
    </button>
  );
};

/* ── Cell Overlay Wrapper ── */
export const TunerOverlay = ({
  index,
  initialPos,
  initialScale,
  enabled,
  onUpdate,
}: CellOverlayProps & { enabled: boolean }) => {
  if (
    !IMAGE_TUNER_UI_ENABLED ||
    process.env.NODE_ENV !== "development" ||
    !enabled
  ) {
    return null;
  }

  return (
    <CellOverlay
      index={index}
      initialPos={initialPos}
      initialScale={initialScale}
      onUpdate={onUpdate}
    />
  );
};
