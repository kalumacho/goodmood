interface ShurikenProps {
  size?: number;
  className?: string;
  spin?: boolean;
  color?: string;
  stroke?: string;
}

export default function Shuriken({
  size = 40,
  className = "",
  spin = true,
  color = "#E8724A",
  stroke = "#0D1B2A",
}: ShurikenProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={`${spin ? "shuriken-spin" : ""} ${className}`}
    >
      {/* 4-pointed star shuriken */}
      <path
        d="M50 5 L58 38 L95 50 L58 62 L50 95 L42 62 L5 50 L42 38 Z"
        fill={color}
        stroke={stroke}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Inner ring */}
      <circle cx="50" cy="50" r="12" fill={stroke} stroke={stroke} strokeWidth="2" />
      <circle cx="50" cy="50" r="6" fill="#FFFDF9" />
      {/* Shine */}
      <circle cx="47" cy="47" r="2" fill="white" opacity="0.8" />
    </svg>
  );
}
