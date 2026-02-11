"use client";

import { useEffect, useRef } from "react";
import styles from "./LavaLamp.module.scss";

export const LavaLamp: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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
      pos.current.x += (target.current.x - pos.current.x) * 0.02;
      pos.current.y += (target.current.y - pos.current.y) * 0.02;

      if (containerRef.current) {
        containerRef.current.style.setProperty("--blob-x", `${pos.current.x}%`);
        containerRef.current.style.setProperty("--blob-y", `${pos.current.y}%`);
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
    <div ref={containerRef} className={styles.container} aria-hidden="true">
      <div className={`${styles.blob} ${styles.blobA}`} />
      <div className={`${styles.blob} ${styles.blobB}`} />
    </div>
  );
};
