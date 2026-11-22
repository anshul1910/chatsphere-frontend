import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "glass";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  isLoading?: boolean;
}

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-[15px] font-semibold transition duration-150 ease-smooth hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:scale-97 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:active:scale-100";

const variants: Record<Variant, string> = {
  primary: "bg-action text-white shadow-[0_10px_28px_rgba(109,74,255,0.45)]",
  glass: "border border-line bg-glass-2 text-fg",
};

export function Button({
  variant = "primary",
  isLoading = false,
  className = "",
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? "Please wait..." : children}
    </button>
  );
}
