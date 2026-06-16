"use client";

type Props = {
  size?: number;
  variant?: "full" | "monogram";
  className?: string;
};

/** Realty Kings logo — gold crown over RK monogram, "REALTY" silver, "KINGS" gold. */
export function Logo({ size = 140, variant = "full", className = "" }: Props) {
  if (variant === "monogram") {
    return (
      <svg
        viewBox="0 0 100 110"
        width={size}
        height={size * 1.1}
        className={className}
        aria-label="Realty Kings"
      >
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbf7ee" />
            <stop offset="35%" stopColor="#c5a063" />
            <stop offset="60%" stopColor="#856537" />
            <stop offset="100%" stopColor="#c5a063" />
          </linearGradient>
        </defs>
        <CrownAndRK fill="url(#g1)" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 480 140"
      width={size * 3.4}
      height={size}
      className={className}
      aria-label="Realty Kings"
    >
      <defs>
        <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbf7ee" />
          <stop offset="35%" stopColor="#c5a063" />
          <stop offset="60%" stopColor="#856537" />
          <stop offset="100%" stopColor="#c5a063" />
        </linearGradient>
        <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8f8f8" />
          <stop offset="50%" stopColor="#c8c8c8" />
          <stop offset="100%" stopColor="#787878" />
        </linearGradient>
      </defs>

      {/* REALTY in silver */}
      <text
        x="10"
        y="100"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="80"
        fontWeight="700"
        fill="url(#silver-grad)"
        letterSpacing="-1"
      >
        REALTY
      </text>

      {/* Crown + RK monogram */}
      <g transform="translate(220, 0)">
        <CrownAndRK fill="url(#gold-grad)" />
      </g>

      {/* KINGS in gold */}
      <text
        x="310"
        y="100"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="80"
        fontWeight="700"
        fill="url(#gold-grad)"
        letterSpacing="-1"
      >
        KINGS
      </text>
    </svg>
  );
}

function CrownAndRK({ fill }: { fill: string }) {
  return (
    <g>
      {/* Crown */}
      <path
        d="M 25 8 L 30 22 L 40 14 L 45 28 L 55 14 L 60 28 L 70 14 L 75 22 L 80 8 L 80 35 L 25 35 Z"
        fill={fill}
        stroke="#856537"
        strokeWidth="0.5"
      />
      {/* Crown jewels */}
      <circle cx="32" cy="14" r="2" fill="#fbf7ee" />
      <circle cx="52" cy="9" r="2.5" fill="#fbf7ee" />
      <circle cx="72" cy="14" r="2" fill="#fbf7ee" />

      {/* RK monogram — stylized R + K crossed */}
      <g fontFamily="Georgia, serif" fontSize="86" fontWeight="900" fill={fill}>
        <text x="14" y="118">R</text>
        <text x="48" y="118">K</text>
      </g>
    </g>
  );
}
