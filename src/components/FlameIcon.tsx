interface FlameIconProps {
  className?: string;
  size?: number;
}

export function FlameIcon({ className = '', size = 20 }: FlameIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF6B35" />
          <stop offset="30%" stopColor="#FF8E53" />
          <stop offset="60%" stopColor="#FFA726" />
          <stop offset="100%" stopColor="#FFB74D" />
        </linearGradient>
        <filter id="flameShadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#FF6B35" floodOpacity="0.5"/>
        </filter>
      </defs>
      <path
        d="M12 2C12 2 8 6 8 10C8 12.5 9.5 14.5 12 14.5C14.5 14.5 16 12.5 16 10C16 6 12 2 12 2Z"
        fill="url(#flameGradient)"
        filter="url(#flameShadow)"
      />
      <path
        d="M12 14.5C12 14.5 10 16.5 10 18.5C10 20 11 21.5 12 21.5C13 21.5 14 20 14 18.5C14 16.5 12 14.5 12 14.5Z"
        fill="url(#flameGradient)"
        opacity="0.8"
      />
      <path
        d="M12 4C12 4 10.5 6.5 10.5 8.5C10.5 9.8 11.2 10.8 12 10.8C12.8 10.8 13.5 9.8 13.5 8.5C13.5 6.5 12 4 12 4Z"
        fill="#FFE082"
        opacity="0.9"
      />
    </svg>
  );
}