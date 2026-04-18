interface NinjaSilhouetteProps {
  pose?: "crouch" | "run" | "stand" | "leap";
  size?: number;
  className?: string;
  fill?: string;
}

export default function NinjaSilhouette({
  pose = "crouch",
  size = 180,
  className = "",
  fill = "#0D1B2A",
}: NinjaSilhouetteProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {pose === "crouch" && <NinjaCrouch fill={fill} />}
      {pose === "run" && <NinjaRun fill={fill} />}
      {pose === "stand" && <NinjaStand fill={fill} />}
      {pose === "leap" && <NinjaLeap fill={fill} />}
    </svg>
  );
}

function NinjaCrouch({ fill }: { fill: string }) {
  return (
    <g>
      {/* Crouching ninja looking out at the sunset */}
      {/* Body - crouched */}
      <path
        d="M70 120 Q65 95 80 85 Q90 80 105 82 Q120 85 125 100 Q128 115 122 130 Q130 140 135 155 L142 180 L130 180 L120 160 L100 160 L95 180 L82 180 L78 155 Q70 140 70 120 Z"
        fill={fill}
      />
      {/* Head with hood */}
      <path d="M82 85 Q80 70 95 65 Q110 62 118 72 Q122 82 115 90 Q100 95 85 90 Z" fill={fill} />
      {/* Headband stripe */}
      <rect x="80" y="75" width="42" height="4" fill="#E8724A" />
      {/* Eye slit */}
      <rect x="90" y="78" width="20" height="3" rx="1.5" fill="#FFFDF9" />
      {/* Arm holding katana */}
      <path d="M118 105 L145 95 L150 100 L125 115 Z" fill={fill} />
      {/* Katana */}
      <line x1="145" y1="95" x2="180" y2="55" stroke={fill} strokeWidth="3" strokeLinecap="round" />
      <line x1="143" y1="98" x2="178" y2="58" stroke="#F9C74F" strokeWidth="1.5" strokeLinecap="round" />
      {/* Scarf flowing */}
      <path
        d="M105 90 Q125 100 145 92 Q155 88 160 80"
        fill="none"
        stroke="#E8724A"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  );
}

function NinjaRun({ fill }: { fill: string }) {
  return (
    <g>
      {/* Running ninja */}
      <ellipse cx="100" cy="50" rx="18" ry="20" fill={fill} />
      <rect x="82" y="55" width="36" height="4" fill="#E8724A" />
      <rect x="92" y="58" width="16" height="2.5" rx="1" fill="#FFFDF9" />
      {/* Body leaning forward */}
      <path
        d="M88 68 Q82 90 90 115 L108 118 Q118 95 115 70 Z"
        fill={fill}
      />
      {/* Arms */}
      <path d="M88 75 L65 90 L70 95 L95 82 Z" fill={fill} />
      <path d="M115 75 L140 65 L142 72 L118 85 Z" fill={fill} />
      {/* Legs */}
      <path d="M95 115 L80 160 L90 165 L105 125 Z" fill={fill} />
      <path d="M108 115 L125 155 L135 150 L118 115 Z" fill={fill} />
      {/* Scarf flowing back */}
      <path d="M100 60 Q70 55 50 70" fill="none" stroke="#E8724A" strokeWidth="4" strokeLinecap="round" />
      <path d="M100 65 Q65 65 45 80" fill="none" stroke="#E8724A" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    </g>
  );
}

function NinjaStand({ fill }: { fill: string }) {
  return (
    <g>
      {/* Standing confident */}
      <ellipse cx="100" cy="45" rx="18" ry="20" fill={fill} />
      <rect x="82" y="50" width="36" height="4" fill="#E8724A" />
      <rect x="92" y="53" width="16" height="2.5" rx="1" fill="#FFFDF9" />
      {/* Body */}
      <path d="M85 65 L90 130 L110 130 L115 65 Z" fill={fill} />
      {/* Arms crossed */}
      <path d="M85 75 L70 100 L78 108 L95 90 Z" fill={fill} />
      <path d="M115 75 L130 100 L122 108 L105 90 Z" fill={fill} />
      {/* Legs */}
      <path d="M90 130 L85 175 L97 175 L100 130 Z" fill={fill} />
      <path d="M100 130 L103 175 L115 175 L110 130 Z" fill={fill} />
      {/* Scarf */}
      <path d="M100 58 Q115 65 125 75" fill="none" stroke="#E8724A" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function NinjaLeap({ fill }: { fill: string }) {
  return (
    <g>
      {/* Leaping ninja */}
      <ellipse cx="95" cy="60" rx="16" ry="18" fill={fill} />
      <rect x="79" y="65" width="32" height="3.5" fill="#E8724A" />
      {/* Body mid-leap */}
      <path d="M82 78 Q75 100 85 125 L105 125 Q115 100 108 78 Z" fill={fill} />
      {/* Arm thrown back */}
      <path d="M82 85 L55 65 L60 72 L87 92 Z" fill={fill} />
      {/* Arm forward */}
      <path d="M108 85 L145 95 L140 100 L105 92 Z" fill={fill} />
      {/* Legs tucked */}
      <path d="M85 125 L70 145 L80 150 L95 130 Z" fill={fill} />
      <path d="M105 125 L130 140 L125 150 L110 130 Z" fill={fill} />
      {/* Scarf flowing */}
      <path d="M95 70 Q60 50 35 60" fill="none" stroke="#E8724A" strokeWidth="4" strokeLinecap="round" />
      <path d="M95 75 Q55 60 30 75" fill="none" stroke="#E8724A" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
    </g>
  );
}
