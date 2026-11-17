export function Mushroom({ size = 64 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <path
        d="M36 56 C36 72 33 84 29 92 L71 92 C67 84 64 72 64 56 Z"
        fill="#F3E5CC"
        stroke="#B8926A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 54 C8 28 27 8 50 8 C73 8 92 28 92 54 C92 59 88 62 83 62 L17 62 C12 62 8 59 8 54 Z"
        fill="#CC4636"
      />
      <circle cx="30" cy="36" r="7" fill="#FFFBF2" />
      <circle cx="54" cy="24" r="5.5" fill="#FFFBF2" />
      <circle cx="72" cy="40" r="6.5" fill="#FFFBF2" />
      <circle cx="48" cy="46" r="4" fill="#FFFBF2" />
      <circle cx="44" cy="74" r="2" fill="#473020" />
      <circle cx="56" cy="74" r="2" fill="#473020" />
      <path d="M47 79 Q50 82 53 79" stroke="#473020" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}
