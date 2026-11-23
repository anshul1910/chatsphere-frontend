import { useState, type FormEvent } from "react";
import { userService } from "../../api/services";
import { useAuth } from "../../hooks/useAuth";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Avatar } from "../common/Avatar";
import { Button } from "../common/Button";
import { Modal } from "../common/Modal";
import { TextField } from "../common/TextField";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

interface FieldErrors {
  username?: string;
  avatar?: string;
}

function validate(username: string, avatar: string): FieldErrors {
  const errors: FieldErrors = {};
  const name = username.trim();

  if (name.length < 3 || name.length > 30) {
    errors.username = "Username must be 3 to 30 characters.";
  }
  if (avatar.trim() !== "" && !/^https?:\/\/\S+$/i.test(avatar.trim())) {
    errors.avatar = "Use a link starting with http:// or https://";
  }
  return errors;
}

function ProfileForm({ onClose }: { onClose: () => void }) {
  const { user, updateUser } = useAuth();
  const [username, setUsername] = useState(user?.username ?? "");
  const [avatar, setAvatar] = useState(user?.avatar ?? "");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors = validate(username, avatar);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setFormError(null);
    setIsSaving(true);
    try {
      const res = await userService.updateProfile({
        username: username.trim(),
        avatar: avatar.trim(),
      });
      updateUser(res.user);
      onClose();
    } catch (error) {
      setFormError(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  }

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2 pb-2">
        <Avatar
          username={
            avatar.trim()
              ? username || user.username
              : username || user.username
          }
          src={avatar.trim()}
          size="lg"
        />
        <p className="text-sm text-fg-3">{user.email}</p>
      </div>

      <TextField
        label="Username"
        autoComplete="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        error={fieldErrors.username}
      />
      <TextField
        label="Avatar link (optional)"
        type="url"
        placeholder="https://example.com/me.png"
        value={avatar}
        onChange={(event) => setAvatar(event.target.value)}
        error={fieldErrors.avatar}
      />

      {formError && (
        <div
          role="alert"
          className="rounded-2xl border border-danger bg-glass-2 px-4 py-3 text-sm text-danger"
        >
          {formError}
        </div>
      )}

      <div className="mt-2 flex gap-3">
        <Button type="submit" isLoading={isSaving} className="flex-1">
          Save changes
        </Button>
        <Button type="button" variant="glass" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export function ProfileModal({ open, onClose }: ProfileModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Your profile">
      <ProfileForm onClose={onClose} />
    </Modal>
  );
}
