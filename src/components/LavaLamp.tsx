"use client";

import { useEffect, useRef } from "react";

export const LavaLamp: React.FC = () => {
  const blobRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 50, y: 50 });
  const target = useRef({ x: 50, y: 50 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      target.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
    };

    const animate = () => {
      // Smooth lerp — the blob drifts toward the cursor lazily
      pos.current.x += (target.current.x - pos.current.x) * 0.03;
      pos.current.y += (target.current.y - pos.current.y) * 0.03;

      if (blobRef.current) {
        blobRef.current.style.setProperty("--blob-x", `${pos.current.x}%`);
        blobRef.current.style.setProperty("--blob-y", `${pos.current.y}%`);
      }

      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        // Two large radial blobs: orange follows cursor, purple stays offset
        background: `
          radial-gradient(
            ellipse 45vw 45vh at var(--blob-x, 50%) var(--blob-y, 50%),
            var(--lava-orange) 0%,
            transparent 70%
          ),
          radial-gradient(
            ellipse 55vw 55vh at calc(100% - var(--blob-x, 50%)) calc(100% - var(--blob-y, 50%)),
            var(--lava-purple) 0%,
            transparent 70%
          )
        `,
        opacity: 0.45,
        mixBlendMode: "normal",
      }}
    />
  );
};
