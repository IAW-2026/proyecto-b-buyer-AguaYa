// components/Logo.tsx
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 100" width={150} height={45}>
        <defs>
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#0ea5e9", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#2563eb", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <g transform="translate(10, 10) scale(0.75)">
          <path d="M60 20 C60 20 30 50 30 75 C30 91.5 43.5 105 60 105 C76.5 105 90 91.5 90 75 C90 65 85 55 80 48" fill="none" stroke="url(#waterGrad)" strokeWidth="10" strokeLinecap="round"/>
          <path d="M80 48 L82 35 M80 48 L68 50" fill="none" stroke="url(#waterGrad)" strokeWidth="10" strokeLinecap="round"/>
          <circle cx="60" cy="75" r="18" fill="url(#waterGrad)" />
        </g>
        <text x="85" y="70" fontFamily="sans-serif" fontWeight="800" fontSize="52" fill="#1e3a8a">
          Agua<tspan fill="#0ea5e9">Ya</tspan>
        </text>
      </svg>
    </Link>
  );
}