import { useState } from "react";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  username: string;
  src?: string;
  size?: AvatarSize;
  online?: boolean;
}

const gradients = [
  "from-[#6d4aff] to-[#4f46e5]",
  "from-[#0e7490] to-[#155e75]",
  "from-[#be185d] to-[#9d174d]",
  "from-[#047857] to-[#065f46]",
  "from-[#b45309] to-[#92400e]",
  "from-[#7c3aed] to-[#5b21b6]",
];

const sizes: Record<AvatarSize, string> = {
  sm: "size-8 text-xs",
  md: "size-11 text-[15px]",
  lg: "size-24 text-3xl",
};

function pickGradient(seed: string): string {
  let hash = 0;
  for (const char of seed) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return gradients[hash % gradients.length] ?? gradients[0] ?? "";
}

export function Avatar({ username, src, size = "md", online }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <span
      className={`relative grid shrink-0 place-items-center rounded-full bg-linear-to-br font-display font-semibold text-white ${pickGradient(username)} ${sizes[size]}`}
    >
      {showImage ? (
        <img
          src={src}
          alt={username}
          onError={() => setFailed(true)}
          className="size-full rounded-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{username.slice(0, 2).toUpperCase()}</span>
      )}
      {online !== undefined && (
        <span
          className={`absolute -right-px -bottom-px size-3.25 rounded-full border-[2.5px] border-surface ${
            online ? "bg-ok" : "bg-fg-3"
          }`}
          role="img"
          aria-label={online ? "Online" : "Offline"}
        />
      )}
    </span>
  );
}
