"use client";

import React from "react";
import styles from "./BrowserPreview.module.scss";

interface BrowserPreviewProps {
  href?: string;
  url?: string;
  scheme?: number;
  className?: string;
}

const SCHEMES = [
  // 0 — Deep Violet (Nudge Lab / default)
  {
    bg: "linear-gradient(150deg, #1a0933 0%, #3b1568 45%, #6d28d9 100%)",
    orb1: "rgba(109,40,217,0.55)",
    orb2: "rgba(192,132,252,0.2)",
    nav: "rgba(255,255,255,0.04)",
    accent: "rgba(216,180,254,0.75)",
    accentSolid: "rgba(167,139,250,0.9)",
    card: "rgba(255,255,255,0.05)",
    cardBorder: "rgba(216,180,254,0.12)",
  },
  // 1 — Ocean Indigo
  {
    bg: "linear-gradient(150deg, #030720 0%, #0f1f6b 45%, #2563eb 100%)",
    orb1: "rgba(37,99,235,0.5)",
    orb2: "rgba(147,197,253,0.18)",
    nav: "rgba(255,255,255,0.04)",
    accent: "rgba(147,197,253,0.8)",
    accentSolid: "rgba(96,165,250,0.9)",
    card: "rgba(255,255,255,0.05)",
    cardBorder: "rgba(147,197,253,0.12)",
  },
  // 2 — Emerald Teal
  {
    bg: "linear-gradient(150deg, #021a12 0%, #065f46 45%, #059669 100%)",
    orb1: "rgba(5,150,105,0.5)",
    orb2: "rgba(110,231,183,0.18)",
    nav: "rgba(255,255,255,0.04)",
    accent: "rgba(110,231,183,0.8)",
    accentSolid: "rgba(52,211,153,0.9)",
    card: "rgba(255,255,255,0.05)",
    cardBorder: "rgba(110,231,183,0.12)",
  },
  // 3 — Rose Magenta
  {
    bg: "linear-gradient(150deg, #1f0020 0%, #7b1060 45%, #db2777 100%)",
    orb1: "rgba(219,39,119,0.5)",
    orb2: "rgba(251,182,206,0.18)",
    nav: "rgba(255,255,255,0.04)",
    accent: "rgba(251,182,206,0.8)",
    accentSolid: "rgba(249,168,212,0.9)",
    card: "rgba(255,255,255,0.05)",
    cardBorder: "rgba(251,182,206,0.12)",
  },
];

function LockIcon() {
  return (
    <svg
      width="10"
      height="11"
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="1" y="4.5" width="8" height="6" rx="1.5" fill="currentColor" opacity="0.5" />
      <path
        d="M3 4.5V3a2 2 0 1 1 4 0v1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export const BrowserPreview: React.FC<BrowserPreviewProps> = ({
  href,
  url,
  scheme = 0,
  className,
}) => {
  const colors = SCHEMES[scheme % SCHEMES.length];

  const displayUrl = url
    ? url
    : href
      ? (() => {
          try {
            return new URL(href).hostname;
          } catch {
            return href;
          }
        })()
      : "preview";

  const window = (
    <div className={`${styles.window} ${className ?? ""}`}>
      {/* ── Browser chrome ── */}
      <div className={styles.chrome}>
        <div className={styles.trafficLights}>
          <span className={`${styles.dot} ${styles.red}`} />
          <span className={`${styles.dot} ${styles.yellow}`} />
          <span className={`${styles.dot} ${styles.green}`} />
        </div>

        <div className={styles.addressBar}>
          <span className={styles.lockIcon}>
            <LockIcon />
          </span>
          <span className={styles.urlText}>{displayUrl}</span>
        </div>

        <div className={styles.chromeRight}>
          {/* three-dot menu placeholder */}
          <span className={styles.menuDot} />
          <span className={styles.menuDot} />
          <span className={styles.menuDot} />
        </div>
      </div>

      {/* ── Simulated viewport ── */}
      <div className={styles.viewport} style={{ background: colors.bg }}>
        {/* ambient orbs */}
        <div
          className={styles.orb1}
          style={{ background: colors.orb1 }}
          aria-hidden="true"
        />
        <div
          className={styles.orb2}
          style={{ background: colors.orb2 }}
          aria-hidden="true"
        />

        {/* simulated navbar */}
        <div className={styles.simNav} style={{ background: colors.nav }}>
          <div className={styles.simLogo} style={{ background: colors.accentSolid }} />
          <div className={styles.simNavLinks}>
            <div className={styles.simNavLink} style={{ background: colors.accent }} />
            <div className={styles.simNavLink} style={{ background: colors.accent }} />
            <div className={styles.simNavLink} style={{ background: colors.accent }} />
          </div>
          <div
            className={styles.simNavCta}
            style={{ background: colors.accentSolid, boxShadow: `0 0 16px ${colors.orb1}` }}
          />
        </div>

        {/* simulated hero */}
        <div className={styles.simHero}>
          <div
            className={styles.simBadge}
            style={{ background: colors.card, borderColor: colors.cardBorder }}
          >
            <div className={styles.simBadgeDot} style={{ background: colors.accentSolid }} />
            <div className={styles.simBadgeText} style={{ background: colors.accent }} />
          </div>
          <div className={styles.simTitle} style={{ background: colors.accentSolid }} />
          <div className={styles.simTitleShort} style={{ background: colors.accentSolid }} />
          <div className={styles.simSubtitle} style={{ background: colors.accent }} />
          <div className={styles.simSubtitleShort} style={{ background: colors.accent }} />
          <div className={styles.simCtaRow}>
            <div
              className={styles.simCtaPrimary}
              style={{
                background: colors.accentSolid,
                boxShadow: `0 4px 20px ${colors.orb1}`,
              }}
            />
            <div
              className={styles.simCtaSecondary}
              style={{ background: colors.card, borderColor: colors.cardBorder }}
            />
          </div>
        </div>

        {/* simulated cards row */}
        <div className={styles.simCardsRow}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={styles.simCard}
              style={{ background: colors.card, borderColor: colors.cardBorder }}
            >
              <div
                className={styles.simCardImg}
                style={{ background: `linear-gradient(135deg, ${colors.orb1}, ${colors.orb2})` }}
              />
              <div className={styles.simCardTitle} style={{ background: colors.accentSolid }} />
              <div className={styles.simCardLine} style={{ background: colors.accent }} />
              <div
                className={styles.simCardLineShort}
                style={{ background: colors.accent }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        aria-label={`Open ${displayUrl}`}
      >
        {window}
      </a>
    );
  }

  return window;
};
