import { useId, type InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function TextField({
  label,
  error,
  className = "",
  id,
  ...rest
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-2 block text-[13px] font-medium text-fg-2 transition duration-150 focus:border-accent"
      >
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-2xl border bg-field px-4 py-3.5 text-[15px] text-fg placeholder:text-fg-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          error ? "border-danger" : "border-line"
        } ${className}`}
        {...rest}
      />
      {error && (
        <p id={errorId} className="mt-2 text-[13px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
