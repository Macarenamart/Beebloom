
function BeeUserIcon({ size = 28, color = "currentColor", className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Cabeza */}
      <circle cx="32" cy="20" r="10" />

      {/* Antenas */}
      <path d="M26 10 L22 4" />
      <path d="M38 10 L42 4" />

      {/* Alas SOLO DELINEADAS */}
      <ellipse cx="18" cy="28" rx="10" ry="6" fill="none" />
      <ellipse cx="46" cy="28" rx="10" ry="6" fill="none" />

      {/* Cuerpo */}
      <path d="M24 32 Q32 48 40 32" />
      <path d="M26 40 L38 40" />
      <path d="M28 48 L36 48" />

      {/* Puntera del abdomen */}
      <path d="M32 56 L32 60" />
    </svg>
  );
}

export default BeeUserIcon;