"use client";

export type RyokuPose = "idle" | "fistpump" | "fire" | "sleeping" | "confused" | "running" | "thinking";

interface RyokuProps {
  pose?: RyokuPose;
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function Ryoku({ pose = "idle", size = 160, className = "", animate = true }: RyokuProps) {
  const animClass = animate ? getPoseAnimation(pose) : "";

  return (
    <div className={`inline-block ${animClass} ${className}`} style={{ width: size, height: size }}>
      {pose === "idle" && <RyokuIdle size={size} />}
      {pose === "fistpump" && <RyokuFistpump size={size} />}
      {pose === "fire" && <RyokuFire size={size} />}
      {pose === "sleeping" && <RyokuSleeping size={size} />}
      {pose === "confused" && <RyokuConfused size={size} />}
      {pose === "running" && <RyokuRunning size={size} />}
      {pose === "thinking" && <RyokuThinking size={size} />}
    </div>
  );
}

function getPoseAnimation(pose: RyokuPose) {
  switch (pose) {
    case "idle": return "ryoku-idle";
    case "fistpump": return "ryoku-fistpump";
    case "sleeping": return "ryoku-idle";
    case "running": return "ryoku-idle";
    default: return "";
  }
}

/* ─── IDLE — bras croisés, sourire confiant ─── */
function RyokuIdle({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 120 160" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Hair spikes — back */}
      <path d="M38 42 Q30 20 42 15 Q38 30 45 35" fill="#1A1A2A" />
      <path d="M82 42 Q90 20 78 15 Q82 30 75 35" fill="#1A1A2A" />
      <path d="M55 35 Q52 12 60 8 Q68 12 65 35" fill="#1A1A2A" />

      {/* Head */}
      <ellipse cx="60" cy="50" rx="24" ry="22" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="2.5" />

      {/* Hair front */}
      <path d="M36 44 Q38 28 50 26 Q56 24 60 26 Q64 24 70 26 Q82 28 84 44" fill="#1A1A2A" />
      <path d="M36 44 Q34 52 38 58" fill="#1A1A2A" />
      <path d="M84 44 Q86 52 82 58" fill="#1A1A2A" />
      {/* Hair strand over forehead */}
      <path d="M52 32 Q54 40 56 44" fill="none" stroke="#1A1A2A" strokeWidth="2" strokeLinecap="round" />

      {/* Headband */}
      <rect x="35" y="45" width="50" height="8" rx="4" fill="#E8724A" stroke="#1A1A2A" strokeWidth="1.5" />
      {/* GM symbol on headband */}
      <text x="60" y="52" textAnchor="middle" fill="white" fontSize="5" fontWeight="900" fontFamily="sans-serif">GM</text>

      {/* Eyes — confident */}
      <ellipse cx="51" cy="57" rx="4.5" ry="4" fill="white" stroke="#1A1A2A" strokeWidth="1.5" />
      <ellipse cx="69" cy="57" rx="4.5" ry="4" fill="white" stroke="#1A1A2A" strokeWidth="1.5" />
      <circle cx="52" cy="58" r="2.5" fill="#1A1A2A" />
      <circle cx="70" cy="58" r="2.5" fill="#1A1A2A" />
      {/* Shine */}
      <circle cx="53" cy="57" r="1" fill="white" />
      <circle cx="71" cy="57" r="1" fill="white" />

      {/* Nose */}
      <path d="M58 62 Q60 64 62 62" fill="none" stroke="#C8956A" strokeWidth="1.5" strokeLinecap="round" />

      {/* Smile */}
      <path d="M52 67 Q60 73 68 67" fill="none" stroke="#1A1A2A" strokeWidth="2" strokeLinecap="round" />
      {/* Cheek blush */}
      <ellipse cx="47" cy="64" rx="4" ry="2.5" fill="#F4A07A" opacity="0.5" />
      <ellipse cx="73" cy="64" rx="4" ry="2.5" fill="#F4A07A" opacity="0.5" />

      {/* Neck */}
      <rect x="54" y="70" width="12" height="8" rx="2" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Body */}
      <path d="M30 110 Q28 90 40 82 L54 78 L66 78 L80 82 Q92 90 90 110 Z" fill="#E8724A" stroke="#1A1A2A" strokeWidth="2" />
      {/* Shirt detail */}
      <path d="M60 78 L60 110" stroke="#C85A35" strokeWidth="1.5" />
      <path d="M48 82 Q60 78 72 82" fill="none" stroke="#C85A35" strokeWidth="1" />

      {/* Left arm — crossed */}
      <path d="M40 82 Q26 88 24 96 Q22 100 30 102 Q34 98 38 92 L44 88" fill="#E8724A" stroke="#1A1A2A" strokeWidth="2" />
      <ellipse cx="24" cy="98" rx="6" ry="5" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Right arm — crossed over */}
      <path d="M80 82 Q94 88 96 96 Q98 100 90 102 Q86 98 82 92 L76 88" fill="#E8724A" stroke="#1A1A2A" strokeWidth="2" />
      <ellipse cx="96" cy="98" rx="6" ry="5" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Crossed arms line */}
      <path d="M36 94 Q60 90 84 94" fill="none" stroke="#C85A35" strokeWidth="1.5" />

      {/* Belt */}
      <rect x="38" y="106" width="44" height="6" rx="2" fill="#0D1B2A" stroke="#1A1A2A" strokeWidth="1.5" />
      <rect x="56" y="104" width="8" height="10" rx="1" fill="#E8724A" stroke="#1A1A2A" strokeWidth="1" />

      {/* Pants */}
      <path d="M38 112 L35 150 L50 150 L60 128 L70 150 L85 150 L82 112 Z" fill="#0D1B2A" stroke="#1A1A2A" strokeWidth="2" />
      <path d="M60 128 L60 112" stroke="#1A3A5A" strokeWidth="1" />

      {/* Shoes */}
      <ellipse cx="42" cy="150" rx="9" ry="5" fill="#1A1A2A" stroke="#1A1A2A" strokeWidth="1.5" />
      <ellipse cx="78" cy="150" rx="9" ry="5" fill="#1A1A2A" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Speed lines accent */}
      <line x1="8" y1="45" x2="28" y2="52" stroke="#E8724A" strokeWidth="1" opacity="0.4" />
      <line x1="6" y1="52" x2="26" y2="56" stroke="#E8724A" strokeWidth="0.8" opacity="0.3" />
      <line x1="112" y1="45" x2="92" y2="52" stroke="#E8724A" strokeWidth="1" opacity="0.4" />
      <line x1="114" y1="52" x2="94" y2="56" stroke="#E8724A" strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

/* ─── FIST PUMP — poing levé victoire ─── */
function RyokuFistpump({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 120 160" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Hair spikes */}
      <path d="M38 42 Q28 18 42 12 Q38 28 45 34" fill="#1A1A2A" />
      <path d="M82 42 Q92 18 78 12 Q82 28 75 34" fill="#1A1A2A" />
      <path d="M55 34 Q50 10 60 6 Q70 10 65 34" fill="#1A1A2A" />
      <path d="M44 36 Q40 16 50 14" fill="none" stroke="#1A1A2A" strokeWidth="3" strokeLinecap="round" />

      {/* Head — tilted slightly */}
      <ellipse cx="60" cy="50" rx="24" ry="22" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="2.5" transform="rotate(-5 60 50)" />

      {/* Hair front */}
      <path d="M37 44 Q39 28 50 25 Q56 23 60 25 Q64 23 70 25 Q81 28 83 44" fill="#1A1A2A" />

      {/* Headband */}
      <rect x="35" y="44" width="50" height="8" rx="4" fill="#E8724A" stroke="#1A1A2A" strokeWidth="1.5" />
      <text x="60" y="51" textAnchor="middle" fill="white" fontSize="5" fontWeight="900" fontFamily="sans-serif">GM</text>

      {/* Eyes — excited/determined */}
      <path d="M46 54 Q51 50 56 54" fill="none" stroke="#1A1A2A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M64 54 Q69 50 74 54" fill="none" stroke="#1A1A2A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Under eye crescents */}
      <path d="M48 57 Q51 59 54 57" fill="none" stroke="#1A1A2A" strokeWidth="1.5" />
      <path d="M66 57 Q69 59 72 57" fill="none" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Big grin */}
      <path d="M50 65 Q60 75 70 65" fill="#1A1A2A" />
      <path d="M50 65 Q60 68 70 65" fill="white" />
      {/* Teeth */}
      <path d="M53 65 L53 67" stroke="#1A1A2A" strokeWidth="1" />
      <path d="M57 65 L57 68" stroke="#1A1A2A" strokeWidth="1" />
      <path d="M63 65 L63 68" stroke="#1A1A2A" strokeWidth="1" />
      <path d="M67 65 L67 67" stroke="#1A1A2A" strokeWidth="1" />

      {/* Blush excited */}
      <ellipse cx="45" cy="63" rx="5" ry="3" fill="#F4A07A" opacity="0.6" />
      <ellipse cx="75" cy="63" rx="5" ry="3" fill="#F4A07A" opacity="0.6" />

      {/* Sweat drops */}
      <path d="M82 38 Q84 34 86 38 Q86 42 82 42 Z" fill="#A0D0FF" stroke="#1A1A2A" strokeWidth="1" />

      {/* Neck */}
      <rect x="54" y="70" width="12" height="8" rx="2" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Body */}
      <path d="M34 112 Q30 90 42 82 L54 78 L66 78 L80 82 Q90 90 88 112 Z" fill="#E8724A" stroke="#1A1A2A" strokeWidth="2" />
      <path d="M60 78 L60 112" stroke="#C85A35" strokeWidth="1.5" />

      {/* Right arm — raised fist up */}
      <path d="M80 84 Q90 72 92 55 Q92 50 88 48" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      <path d="M80 84 Q90 72 92 55 Q92 50 88 48" fill="none" stroke="#1A1A2A" strokeWidth="12" strokeLinecap="round" />
      <path d="M80 84 Q90 72 92 55 Q92 50 88 48" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      {/* Fist */}
      <rect x="82" y="38" width="14" height="14" rx="4" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="2" />
      <path d="M84 38 L84 45 M88 38 L88 46 M92 38 L92 45" stroke="#C8956A" strokeWidth="1" />

      {/* Left arm — on hip */}
      <path d="M42 82 Q28 90 26 100" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      <path d="M42 82 Q28 90 26 100" fill="none" stroke="#1A1A2A" strokeWidth="12" strokeLinecap="round" />
      <path d="M42 82 Q28 90 26 100" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="25" cy="102" rx="6" ry="5" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Belt */}
      <rect x="38" y="108" width="44" height="6" rx="2" fill="#0D1B2A" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Pants */}
      <path d="M38 114 L36 150 L51 150 L60 130 L69 150 L84 150 L82 114 Z" fill="#0D1B2A" stroke="#1A1A2A" strokeWidth="2" />

      {/* Shoes */}
      <ellipse cx="43" cy="150" rx="9" ry="5" fill="#1A1A2A" stroke="#1A1A2A" strokeWidth="1.5" />
      <ellipse cx="77" cy="150" rx="9" ry="5" fill="#1A1A2A" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Impact lines around fist */}
      <line x1="100" y1="28" x2="108" y2="20" stroke="#E8724A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="104" y1="38" x2="114" y2="34" stroke="#E8724A" strokeWidth="2" strokeLinecap="round" />
      <line x1="96" y1="20" x2="100" y2="10" stroke="#E8724A" strokeWidth="2" strokeLinecap="round" />
      <line x1="86" y1="16" x2="86" y2="6" stroke="#E8724A" strokeWidth="2" strokeLinecap="round" />
      <line x1="108" y1="48" x2="118" y2="46" stroke="#E8724A" strokeWidth="1.5" strokeLinecap="round" />

      {/* Stars around fist */}
      <text x="105" y="18" fontSize="10" fill="#E8724A" fontWeight="900">★</text>
      <text x="92" y="8" fontSize="8" fill="#FFD700" fontWeight="900">✦</text>
    </svg>
  );
}

/* ─── FIRE — flammes, expression intense ─── */
function RyokuFire({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 120 170" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Flames behind — animated in CSS */}
      <g className="animate-fire" style={{ transformOrigin: "60px 160px" }}>
        <path d="M30 160 Q25 140 40 130 Q32 145 50 140 Q35 125 55 110 Q50 130 65 120 Q58 135 75 130 Q65 145 80 140 Q90 125 85 110 Q100 130 90 140 Q108 145 100 130 Q115 140 110 160 Z" fill="#FFD700" opacity="0.9" />
        <path d="M38 160 Q34 144 46 136 Q40 148 55 144 Q43 132 58 118 Q54 135 67 126 Q62 140 76 136 Q68 148 80 144 Q88 132 84 118 Q96 136 89 144 Q102 148 96 136 Q108 144 104 160 Z" fill="#FF8C00" opacity="0.95" />
        <path d="M46 160 Q44 148 54 142 Q50 152 62 148 Q54 138 64 126 Q62 142 72 136 Q68 148 78 144 Q82 136 78 126 Q88 140 82 148 Q92 152 88 142 Q98 148 96 160 Z" fill="#E8724A" />
      </g>

      {/* Hair spikes — wild */}
      <path d="M36 44 Q24 16 40 10 Q36 26 44 32" fill="#1A1A2A" />
      <path d="M84 44 Q96 16 80 10 Q84 26 76 32" fill="#1A1A2A" />
      <path d="M54 32 Q48 6 60 2 Q72 6 66 32" fill="#1A1A2A" />
      <path d="M44 34 Q38 14 48 12" fill="none" stroke="#1A1A2A" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M76 34 Q82 14 72 12" fill="none" stroke="#1A1A2A" strokeWidth="3.5" strokeLinecap="round" />

      {/* Head */}
      <ellipse cx="60" cy="52" rx="24" ry="22" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="2.5" />

      {/* Hair front */}
      <path d="M36 46 Q38 30 50 27 Q56 25 60 27 Q64 25 70 27 Q82 30 84 46" fill="#1A1A2A" />

      {/* Headband */}
      <rect x="35" y="46" width="50" height="8" rx="4" fill="#E8724A" stroke="#1A1A2A" strokeWidth="1.5" />
      <text x="60" y="53" textAnchor="middle" fill="white" fontSize="5" fontWeight="900" fontFamily="sans-serif">GM</text>

      {/* Eyes — intense/determined */}
      <path d="M45 55 L56 52" stroke="#1A1A2A" strokeWidth="3" strokeLinecap="round" />
      <path d="M64 52 L75 55" stroke="#1A1A2A" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="50.5" cy="58" rx="5" ry="4.5" fill="white" stroke="#1A1A2A" strokeWidth="1.5" />
      <ellipse cx="69.5" cy="58" rx="5" ry="4.5" fill="white" stroke="#1A1A2A" strokeWidth="1.5" />
      <circle cx="52" cy="59" r="3" fill="#1A1A2A" />
      <circle cx="71" cy="59" r="3" fill="#1A1A2A" />
      <circle cx="53" cy="57.5" r="1.2" fill="white" />
      <circle cx="72" cy="57.5" r="1.2" fill="white" />

      {/* Determined mouth */}
      <path d="M53 68 Q60 72 67 68" fill="#1A1A2A" />
      <path d="M53 68 Q60 70 67 68" fill="white" />
      {/* Gritted teeth */}
      <line x1="55" y1="68" x2="55" y2="70" stroke="#1A1A2A" strokeWidth="1" />
      <line x1="58" y1="68" x2="58" y2="71" stroke="#1A1A2A" strokeWidth="1" />
      <line x1="62" y1="68" x2="62" y2="71" stroke="#1A1A2A" strokeWidth="1" />
      <line x1="65" y1="68" x2="65" y2="70" stroke="#1A1A2A" strokeWidth="1" />

      {/* Vein mark on forehead — intensity */}
      <path d="M68 44 Q70 40 74 42 Q72 44 70 44 Z" fill="#E8724A" />

      {/* Neck */}
      <rect x="54" y="72" width="12" height="8" rx="2" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Body — leaning forward */}
      <path d="M32 115 Q28 92 40 84 L54 80 L66 80 L80 84 Q92 92 90 115 Z" fill="#E8724A" stroke="#1A1A2A" strokeWidth="2" />
      <path d="M60 80 L60 115" stroke="#C85A35" strokeWidth="1.5" />

      {/* Arms — both fists forward */}
      <path d="M42 84 Q22 90 16 98 Q14 104 20 106" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      <path d="M42 84 Q22 90 16 98 Q14 104 20 106" fill="none" stroke="#1A1A2A" strokeWidth="12" strokeLinecap="round" />
      <path d="M42 84 Q22 90 16 98 Q14 104 20 106" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      <rect x="12" y="100" width="14" height="12" rx="4" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="2" />

      <path d="M78 84 Q98 90 104 98 Q106 104 100 106" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      <path d="M78 84 Q98 90 104 98 Q106 104 100 106" fill="none" stroke="#1A1A2A" strokeWidth="12" strokeLinecap="round" />
      <path d="M78 84 Q98 90 104 98 Q106 104 100 106" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      <rect x="94" y="100" width="14" height="12" rx="4" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="2" />

      {/* Belt */}
      <rect x="38" y="111" width="44" height="6" rx="2" fill="#0D1B2A" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Pants */}
      <path d="M38 117 L36 152 L51 152 L60 134 L69 152 L84 152 L82 117 Z" fill="#0D1B2A" stroke="#1A1A2A" strokeWidth="2" />

      {/* Shoes */}
      <ellipse cx="43" cy="152" rx="9" ry="5" fill="#1A1A2A" stroke="#1A1A2A" strokeWidth="1.5" />
      <ellipse cx="77" cy="152" rx="9" ry="5" fill="#1A1A2A" stroke="#1A1A2A" strokeWidth="1.5" />
    </svg>
  );
}

/* ─── SLEEPING — Zzz, repos ─── */
function RyokuSleeping({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 140 120" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Body lying down */}
      <ellipse cx="70" cy="90" rx="55" ry="18" fill="#E8724A" stroke="#1A1A2A" strokeWidth="2" />
      <path d="M20 88 Q70 72 120 88 Q120 95 70 98 Q20 95 20 88 Z" fill="#C85A35" />

      {/* Arms tucked */}
      <path d="M20 88 Q10 86 8 90 Q8 96 16 96" fill="#E8724A" stroke="#1A1A2A" strokeWidth="1.5" />
      <ellipse cx="8" cy="92" rx="6" ry="5" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="1.5" />
      <path d="M120 88 Q130 86 132 90 Q132 96 124 96" fill="#E8724A" stroke="#1A1A2A" strokeWidth="1.5" />
      <ellipse cx="132" cy="92" rx="6" ry="5" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Pants legs */}
      <path d="M48 95 L44 115 L58 115 L62 100 Z" fill="#0D1B2A" stroke="#1A1A2A" strokeWidth="1.5" />
      <path d="M82 95 L78 115 L92 115 L88 100 Z" fill="#0D1B2A" stroke="#1A1A2A" strokeWidth="1.5" />
      <ellipse cx="51" cy="115" rx="8" ry="4" fill="#1A1A2A" />
      <ellipse cx="85" cy="115" rx="8" ry="4" fill="#1A1A2A" />

      {/* Head resting */}
      <ellipse cx="35" cy="68" rx="22" ry="20" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="2.5" />

      {/* Hair */}
      <path d="M16 62 Q18 44 28 40 Q24 54 30 58" fill="#1A1A2A" />
      <path d="M54 62 Q56 44 46 40 Q50 54 44 58" fill="#1A1A2A" />
      <path d="M30 52 Q28 38 35 34 Q42 38 40 52" fill="#1A1A2A" />
      <path d="M14 66 Q16 52 22 50 Q18 58 20 64" fill="#1A1A2A" />
      {/* Hair front */}
      <path d="M14 62 Q16 48 24 46 Q30 44 35 46 Q40 44 44 46 Q52 48 54 62" fill="#1A1A2A" />

      {/* Headband */}
      <rect x="13" y="62" width="44" height="7" rx="3.5" fill="#E8724A" stroke="#1A1A2A" strokeWidth="1.5" />
      <text x="35" y="68" textAnchor="middle" fill="white" fontSize="4.5" fontWeight="900" fontFamily="sans-serif">GM</text>

      {/* Eyes closed — sleeping */}
      <path d="M24 70 Q28 67 32 70" fill="none" stroke="#1A1A2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M38 70 Q42 67 46 70" fill="none" stroke="#1A1A2A" strokeWidth="2" strokeLinecap="round" />
      {/* Eyelashes */}
      <line x1="24" y1="70" x2="23" y2="72" stroke="#1A1A2A" strokeWidth="1" />
      <line x1="32" y1="70" x2="33" y2="72" stroke="#1A1A2A" strokeWidth="1" />
      <line x1="38" y1="70" x2="37" y2="72" stroke="#1A1A2A" strokeWidth="1" />
      <line x1="46" y1="70" x2="47" y2="72" stroke="#1A1A2A" strokeWidth="1" />

      {/* Small smile */}
      <path d="M30 77 Q35 80 40 77" fill="none" stroke="#1A1A2A" strokeWidth="1.5" strokeLinecap="round" />

      {/* Blush sleeping */}
      <ellipse cx="22" cy="74" rx="4" ry="2.5" fill="#F4A07A" opacity="0.5" />
      <ellipse cx="48" cy="74" rx="4" ry="2.5" fill="#F4A07A" opacity="0.5" />

      {/* Drool drop */}
      <path d="M42 80 Q44 84 42 88 Q40 84 42 80" fill="#A0D0FF" stroke="#1A1A2A" strokeWidth="0.8" />

      {/* Zzz */}
      <text x="65" y="40" fontSize="14" fontWeight="900" fill="#0D1B2A" opacity="0.6" fontFamily="sans-serif">z</text>
      <text x="76" y="28" fontSize="18" fontWeight="900" fill="#0D1B2A" opacity="0.7" fontFamily="sans-serif">z</text>
      <text x="90" y="14" fontSize="22" fontWeight="900" fill="#0D1B2A" opacity="0.8" fontFamily="sans-serif">Z</text>
    </svg>
  );
}

/* ─── CONFUSED — ? au-dessus de la tête ─── */
function RyokuConfused({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 120 160" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Question mark cloud */}
      <ellipse cx="85" cy="20" rx="20" ry="16" fill="white" stroke="#1A1A2A" strokeWidth="2" />
      <text x="85" y="27" textAnchor="middle" fontSize="20" fontWeight="900" fill="#E8724A" fontFamily="sans-serif">?</text>
      {/* Thought dots */}
      <circle cx="74" cy="38" r="3" fill="white" stroke="#1A1A2A" strokeWidth="1.5" />
      <circle cx="68" cy="45" r="2" fill="white" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Hair spikes */}
      <path d="M38 44 Q30 22 42 16" fill="#1A1A2A" />
      <path d="M82 44 Q90 22 78 16" fill="#1A1A2A" />
      <path d="M55 36 Q52 14 60 10 Q68 14 65 36" fill="#1A1A2A" />

      {/* Head */}
      <ellipse cx="60" cy="52" rx="24" ry="22" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="2.5" />

      {/* Hair front */}
      <path d="M36 46 Q38 30 50 27 Q56 25 60 27 Q64 25 70 27 Q82 30 84 46" fill="#1A1A2A" />

      {/* Headband */}
      <rect x="35" y="46" width="50" height="8" rx="4" fill="#E8724A" stroke="#1A1A2A" strokeWidth="1.5" />
      <text x="60" y="53" textAnchor="middle" fill="white" fontSize="5" fontWeight="900" fontFamily="sans-serif">GM</text>

      {/* Eyes — one raised, tilted */}
      <ellipse cx="51" cy="59" rx="4.5" ry="4" fill="white" stroke="#1A1A2A" strokeWidth="1.5" />
      <ellipse cx="69" cy="58" rx="4.5" ry="5" fill="white" stroke="#1A1A2A" strokeWidth="1.5" />
      <circle cx="52" cy="60" r="2.5" fill="#1A1A2A" />
      <circle cx="70" cy="59" r="2.5" fill="#1A1A2A" />
      {/* Uneven eyebrows — confused */}
      <path d="M47 54 Q51 52 55 55" fill="none" stroke="#1A1A2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M65 53 Q70 56 74 53" fill="none" stroke="#1A1A2A" strokeWidth="2" strokeLinecap="round" />

      {/* Confused mouth — wavy */}
      <path d="M52 68 Q56 65 60 68 Q64 71 68 68" fill="none" stroke="#1A1A2A" strokeWidth="2" strokeLinecap="round" />

      {/* Sweat drop */}
      <path d="M74 47 Q76 43 78 47 Q78 51 74 51 Z" fill="#A0D0FF" stroke="#1A1A2A" strokeWidth="1" />

      {/* Hand on head */}
      <path d="M80 84 Q92 76 94 64 Q94 58 88 56" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      <path d="M80 84 Q92 76 94 64 Q94 58 88 56" fill="none" stroke="#1A1A2A" strokeWidth="12" strokeLinecap="round" />
      <path d="M80 84 Q92 76 94 64 Q94 58 88 56" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="87" cy="53" rx="7" ry="6" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Neck */}
      <rect x="54" y="72" width="12" height="8" rx="2" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Body */}
      <path d="M32 114 Q28 92 40 84 L54 80 L66 80 L80 84 Q92 92 90 114 Z" fill="#E8724A" stroke="#1A1A2A" strokeWidth="2" />
      <path d="M60 80 L60 114" stroke="#C85A35" strokeWidth="1.5" />

      {/* Left arm — down */}
      <path d="M40 84 Q26 92 24 102" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      <path d="M40 84 Q26 92 24 102" fill="none" stroke="#1A1A2A" strokeWidth="12" strokeLinecap="round" />
      <path d="M40 84 Q26 92 24 102" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="23" cy="104" rx="6" ry="5" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Belt */}
      <rect x="38" y="110" width="44" height="6" rx="2" fill="#0D1B2A" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Pants */}
      <path d="M38 116 L36 152 L51 152 L60 132 L69 152 L84 152 L82 116 Z" fill="#0D1B2A" stroke="#1A1A2A" strokeWidth="2" />

      {/* Shoes */}
      <ellipse cx="43" cy="152" rx="9" ry="5" fill="#1A1A2A" stroke="#1A1A2A" strokeWidth="1.5" />
      <ellipse cx="77" cy="152" rx="9" ry="5" fill="#1A1A2A" stroke="#1A1A2A" strokeWidth="1.5" />
    </svg>
  );
}

/* ─── RUNNING — en mouvement ─── */
function RyokuRunning({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 140 160" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Speed lines behind */}
      <line x1="0" y1="70" x2="30" y2="72" stroke="#E8724A" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="0" y1="80" x2="25" y2="82" stroke="#E8724A" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="0" y1="90" x2="32" y2="91" stroke="#E8724A" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <line x1="0" y1="60" x2="20" y2="62" stroke="#E8724A" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <line x1="0" y1="100" x2="18" y2="101" stroke="#E8724A" strokeWidth="1" strokeLinecap="round" opacity="0.3" />

      {/* Hair spikes — swept back */}
      <path d="M52 38 Q42 20 54 14 Q52 26 58 32" fill="#1A1A2A" />
      <path d="M58 34 Q52 12 62 8 Q68 12 64 34" fill="#1A1A2A" />
      <path d="M64 34 Q68 14 72 16" fill="none" stroke="#1A1A2A" strokeWidth="3" strokeLinecap="round" />
      <path d="M48 36 Q44 18 52 16" fill="none" stroke="#1A1A2A" strokeWidth="3" strokeLinecap="round" />

      {/* Head — tilted forward */}
      <ellipse cx="68" cy="46" rx="22" ry="20" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="2.5" transform="rotate(-10 68 46)" />

      {/* Hair front */}
      <path d="M48 40 Q52 26 60 24 Q68 22 74 24 Q82 26 86 40" fill="#1A1A2A" transform="rotate(-10 67 40)" />

      {/* Headband — scarf flowing */}
      <rect x="46" y="40" width="48" height="7" rx="3.5" fill="#E8724A" stroke="#1A1A2A" strokeWidth="1.5" transform="rotate(-10 70 43)" />
      {/* Flowing end */}
      <path d="M92 44 Q102 40 108 50 Q100 46 94 50 Z" fill="#E8724A" stroke="#1A1A2A" strokeWidth="1" />
      <text x="70" y="47" textAnchor="middle" fill="white" fontSize="4.5" fontWeight="900" fontFamily="sans-serif" transform="rotate(-10 70 47)">GM</text>

      {/* Eyes — focused, squinting */}
      <path d="M57 52 Q62 49 67 52" fill="none" stroke="#1A1A2A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M69 51 Q74 48 79 51" fill="none" stroke="#1A1A2A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M58 54 Q62 57 66 54" fill="none" stroke="#1A1A2A" strokeWidth="1.5" />
      <path d="M70 54 Q74 57 78 54" fill="none" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Mouth — gritted running */}
      <path d="M62 59 Q68 63 74 59" fill="none" stroke="#1A1A2A" strokeWidth="2" strokeLinecap="round" />

      {/* Sweat drops flying off */}
      <path d="M84 36 Q86 32 88 36 Q88 40 84 40 Z" fill="#A0D0FF" stroke="#1A1A2A" strokeWidth="0.8" />
      <path d="M90 46 Q92 43 93 46 Q93 49 90 49 Z" fill="#A0D0FF" stroke="#1A1A2A" strokeWidth="0.8" />

      {/* Neck */}
      <rect x="62" y="64" width="10" height="7" rx="2" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Body — leaning forward */}
      <path d="M42 112 Q38 90 50 82 L62 78 L74 76 L86 80 Q98 88 96 112 Z" fill="#E8724A" stroke="#1A1A2A" strokeWidth="2" transform="rotate(-5 69 94)" />

      {/* Left arm — forward swing */}
      <path d="M52 84 Q36 80 28 70" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      <path d="M52 84 Q36 80 28 70" fill="none" stroke="#1A1A2A" strokeWidth="12" strokeLinecap="round" />
      <path d="M52 84 Q36 80 28 70" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="26" cy="68" rx="6" ry="5" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="1.5" transform="rotate(-20 26 68)" />

      {/* Right arm — back swing */}
      <path d="M82 82 Q98 88 106 100" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      <path d="M82 82 Q98 88 106 100" fill="none" stroke="#1A1A2A" strokeWidth="12" strokeLinecap="round" />
      <path d="M82 82 Q98 88 106 100" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="107" cy="102" rx="6" ry="5" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Belt */}
      <rect x="44" y="108" width="42" height="5" rx="2" fill="#0D1B2A" stroke="#1A1A2A" strokeWidth="1.5" transform="rotate(-3 65 110)" />

      {/* Front leg — forward kick */}
      <path d="M48 113 Q42 130 38 148" fill="none" stroke="#0D1B2A" strokeWidth="14" strokeLinecap="round" />
      <path d="M48 113 Q42 130 38 148" fill="none" stroke="#1A1A2A" strokeWidth="16" strokeLinecap="round" />
      <path d="M48 113 Q42 130 38 148" fill="none" stroke="#0D1B2A" strokeWidth="14" strokeLinecap="round" />
      <ellipse cx="36" cy="150" rx="10" ry="5" fill="#1A1A2A" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Back leg — behind */}
      <path d="M76 110 Q84 125 92 135 Q96 142 88 148" fill="none" stroke="#0D1B2A" strokeWidth="12" strokeLinecap="round" />
      <path d="M76 110 Q84 125 92 135 Q96 142 88 148" fill="none" stroke="#1A1A2A" strokeWidth="14" strokeLinecap="round" />
      <path d="M76 110 Q84 125 92 135 Q96 142 88 148" fill="none" stroke="#0D1B2A" strokeWidth="12" strokeLinecap="round" />
      <ellipse cx="90" cy="150" rx="10" ry="5" fill="#1A1A2A" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Dust clouds */}
      <ellipse cx="36" cy="154" rx="12" ry="4" fill="white" stroke="#1A1A2A" strokeWidth="1" opacity="0.8" />
      <ellipse cx="30" cy="158" rx="8" ry="3" fill="white" stroke="#1A1A2A" strokeWidth="1" opacity="0.6" />
      <ellipse cx="20" cy="155" rx="6" ry="2.5" fill="white" stroke="#1A1A2A" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

/* ─── THINKING — doigt sur la tempe ─── */
function RyokuThinking({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 120 160" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Thought cloud */}
      <circle cx="94" cy="18" r="14" fill="white" stroke="#1A1A2A" strokeWidth="2" />
      <circle cx="82" cy="26" r="10" fill="white" stroke="#1A1A2A" strokeWidth="2" />
      <circle cx="96" cy="30" r="8" fill="white" stroke="#1A1A2A" strokeWidth="2" />
      {/* Stars/ideas in cloud */}
      <text x="88" y="22" fontSize="10" textAnchor="middle" fill="#E8724A" fontWeight="900">★</text>
      <text x="98" y="30" fontSize="7" textAnchor="middle" fill="#FFD700">✦</text>
      {/* Bubble trail */}
      <circle cx="76" cy="38" r="3.5" fill="white" stroke="#1A1A2A" strokeWidth="1.5" />
      <circle cx="71" cy="46" r="2.5" fill="white" stroke="#1A1A2A" strokeWidth="1.5" />
      <circle cx="68" cy="53" r="1.5" fill="white" stroke="#1A1A2A" strokeWidth="1" />

      {/* Hair spikes */}
      <path d="M38 44 Q30 22 42 16 Q38 30 45 36" fill="#1A1A2A" />
      <path d="M82 44 Q90 22 78 16 Q82 30 75 36" fill="#1A1A2A" />
      <path d="M55 36 Q52 12 60 8 Q68 12 65 36" fill="#1A1A2A" />

      {/* Head */}
      <ellipse cx="60" cy="52" rx="24" ry="22" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="2.5" />

      {/* Hair front */}
      <path d="M36 46 Q38 30 50 27 Q56 25 60 27 Q64 25 70 27 Q82 30 84 46" fill="#1A1A2A" />

      {/* Headband */}
      <rect x="35" y="46" width="50" height="8" rx="4" fill="#E8724A" stroke="#1A1A2A" strokeWidth="1.5" />
      <text x="60" y="53" textAnchor="middle" fill="white" fontSize="5" fontWeight="900" fontFamily="sans-serif">GM</text>

      {/* Eyes — one looking up, thinking */}
      <ellipse cx="51" cy="59" rx="4.5" ry="4" fill="white" stroke="#1A1A2A" strokeWidth="1.5" />
      <ellipse cx="69" cy="59" rx="4.5" ry="4" fill="white" stroke="#1A1A2A" strokeWidth="1.5" />
      <circle cx="52" cy="57" r="2.5" fill="#1A1A2A" />
      <circle cx="70" cy="57" r="2.5" fill="#1A1A2A" />

      {/* Thinking eyebrow */}
      <path d="M65 54 Q69 51 73 54" fill="none" stroke="#1A1A2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M47 55 Q51 53 55 55" fill="none" stroke="#1A1A2A" strokeWidth="2" strokeLinecap="round" />

      {/* Closed thinking smile */}
      <path d="M53 67 Q60 71 67 67" fill="none" stroke="#1A1A2A" strokeWidth="2" strokeLinecap="round" />

      {/* Finger on temple */}
      <path d="M80 84 Q90 78 88 66 Q86 60 80 58" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      <path d="M80 84 Q90 78 88 66 Q86 60 80 58" fill="none" stroke="#1A1A2A" strokeWidth="12" strokeLinecap="round" />
      <path d="M80 84 Q90 78 88 66 Q86 60 80 58" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      {/* Finger pointing */}
      <ellipse cx="78" cy="56" rx="4.5" ry="5" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="1.5" />
      <rect x="73" y="51" width="5" height="8" rx="2.5" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Neck */}
      <rect x="54" y="72" width="12" height="8" rx="2" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Body */}
      <path d="M32 114 Q28 92 40 84 L54 80 L66 80 L80 84 Q92 92 90 114 Z" fill="#E8724A" stroke="#1A1A2A" strokeWidth="2" />
      <path d="M60 80 L60 114" stroke="#C85A35" strokeWidth="1.5" />

      {/* Left arm — at side */}
      <path d="M40 84 Q26 92 24 104" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      <path d="M40 84 Q26 92 24 104" fill="none" stroke="#1A1A2A" strokeWidth="12" strokeLinecap="round" />
      <path d="M40 84 Q26 92 24 104" fill="none" stroke="#E8724A" strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="23" cy="106" rx="6" ry="5" fill="#FDDBB4" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Belt */}
      <rect x="38" y="110" width="44" height="6" rx="2" fill="#0D1B2A" stroke="#1A1A2A" strokeWidth="1.5" />

      {/* Pants */}
      <path d="M38 116 L36 152 L51 152 L60 132 L69 152 L84 152 L82 116 Z" fill="#0D1B2A" stroke="#1A1A2A" strokeWidth="2" />

      {/* Shoes */}
      <ellipse cx="43" cy="152" rx="9" ry="5" fill="#1A1A2A" stroke="#1A1A2A" strokeWidth="1.5" />
      <ellipse cx="77" cy="152" rx="9" ry="5" fill="#1A1A2A" stroke="#1A1A2A" strokeWidth="1.5" />
    </svg>
  );
}
