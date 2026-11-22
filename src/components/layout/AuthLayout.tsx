import type { ReactNode } from "react";
import { Logo } from "../common/Logo";
import { ThemeToggle } from "../common/ThemeToggle";

interface AuthLayoutProps {
  hero: ReactNode;
  children: ReactNode;
}

export function AuthLayout({ hero, children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col gap-7 overflow-hidden px-6 py-9 md:px-16">
      <div className="orb -left-40 -top-44 size-140 bg-brand" />
      <div className="orb -bottom-40 -right-36 size-120 bg-signal" />
      <div className="orb right-96 top-20 hidden size-80 bg-pulse lg:block" />

      <header className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="font-display text-2xl font-bold text-fg">
            ChatSphere
          </span>
        </div>
        <ThemeToggle />
      </header>

      <main className="relative z-10 flex flex-1 flex-wrap items-center justify-between gap-12">
        <div className="max-w-xl flex-1 basis-105 animate-fade-up">{hero}</div>
        <div className="glass w-full max-w-115 animate-pop-in rounded-[28px] p-8 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
