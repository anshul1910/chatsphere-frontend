import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { LoginHero } from "../../components/auth/LoginHero";
import { TextField } from "../../components/common/TextField";
import { Button } from "../../components/common/Button";
import { useAuth } from "../../hooks/useAuth";
import { getErrorMessage } from "../../utils/getErrorMessage";

interface FieldErrors {
  email?: string;
  password?: string;
}

function validate(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!password) {
    errors.password = "Password is required.";
  }
  return errors;
}

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors = validate(email, password);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setFormError(null);
    setIsSubmitting(true);
    try {
      await login({ email: email.trim(), password });
      navigate("/", { replace: true });
    } catch (error) {
      setFormError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout hero={<LoginHero />}>
      <h2 className="font-display text-3xl font-bold text-fg">Welcome back</h2>
      <p className="mt-2 text-[15px] text-fg-2">
        Sign in to continue your conversations.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-7 flex flex-col gap-4"
      >
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
        />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
        />

        {formError && (
          <div
            role="alert"
            className="rounded-2xl border border-danger bg-glass-2 px-4 py-3 text-sm text-danger"
          >
            {formError}
          </div>
        )}

        <Button type="submit" isLoading={isSubmitting} className="mt-2 w-full">
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-fg-2">
        New to ChatSphere?{" "}
        <Link
          to="/register"
          className="font-semibold text-accent hover:underline"
        >
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
