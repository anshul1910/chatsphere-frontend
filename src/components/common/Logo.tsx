export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="ChatSphere logo"
    >
      <defs>
        <linearGradient
          id="cs-logo-gradient"
          x1="0"
          y1="0"
          x2="48"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7B61FF" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="20" fill="url(#cs-logo-gradient)" />
      <ellipse
        cx="24"
        cy="24"
        rx="20"
        ry="8"
        transform="rotate(-25 24 24)"
        stroke="#fff"
        strokeOpacity=".6"
        fill="none"
        strokeWidth="1.6"
      />
      <path
        d="M15 20.5a3.5 3.5 0 0 1 3.5-3.5h11a3.5 3.5 0 0 1 3.5 3.5v6a3.5 3.5 0 0 1-3.5 3.5H24l-5 4v-4h-.5A3.5 3.5 0 0 1 15 26.5z"
        fill="#fff"
      />
    </svg>
  );
}
