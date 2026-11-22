import { Logo } from "./Logo";

export function FullScreenLoader() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="animate-pulse" role="status" aria-label="Loading">
        <Logo size={64} />
      </div>
    </div>
  );
}
