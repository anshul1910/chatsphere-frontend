import { useEffect, useId, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "./icons";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  position?: "center" | "top";
  children: ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  position = "center",
  children,
}: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex animate-fade-in justify-center bg-scrim p-6 backdrop-blur-sm ${
        position === "top" ? "items-start pt-24" : "items-center"
      }`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : "Dialog"}
        className="w-full max-w-lg animate-pop-in rounded-[28px] border border-line bg-glass-2 p-6 shadow-(--shadow) backdrop-blur-[26px] md:p-7"
      >
        {title && (
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2
              id={titleId}
              className="font-display text-2xl font-bold text-fg"
            >
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="grid size-10 cursor-pointer place-items-center rounded-xl border border-line bg-glass text-fg transition duration-150 hover:brightness-110 active:scale-97"
            >
              <XIcon />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
