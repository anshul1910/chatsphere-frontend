import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { RegisterHero } from "../../components/auth/RegisterHero";
import { TextField } from "../../components/common/TextField";
import { Button } from "../../components/common/Button";
import { useAuth } from "../../hooks/useAuth";
import { getErrorMessage } from "../../utils/getErrorMessage";

interface FieldErrors {
  username?: string;
  email?: string;
  password?: string;
}

function validate(
  username: string,
  email: string,
  password: string,
): FieldErrors {
  const errors: FieldErrors = {};
  const name = username.trim();

  if (name.length < 3 || name.length > 30) {
    errors.username = "Username must be 3 to 30 characters.";
  }
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  } else if (password.length > 72) {
    errors.password = "Password must be 72 characters or fewer.";
  }
  return errors;
}

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors = validate(username, email, password);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setFormError(null);
    setIsSubmitting(true);
    try {
      await register({
        username: username.trim(),
        email: email.trim(),
        password,
      });
      navigate("/", { replace: true });
    } catch (error) {
      setFormError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout hero={<RegisterHero />}>
      <h2 className="font-display text-3xl font-bold text-fg">
        Create your account
      </h2>
      <p className="mt-2 text-[15px] text-fg-2">It takes less than a minute.</p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-7 flex flex-col gap-4"
      >
        <TextField
          label="Username"
          autoComplete="username"
          placeholder="yourname"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={fieldErrors.username}
        />
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
          autoComplete="new-password"
          placeholder="At least 8 characters"
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
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-fg-2">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
