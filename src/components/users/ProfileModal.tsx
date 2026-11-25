import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
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

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function validateUsername(username: string): string | undefined {
  const name = username.trim();
  if (name.length < 3 || name.length > 30) {
    return "Username must be 3 to 30 characters.";
  }
  return undefined;
}

function ProfileForm({ onClose }: { onClose: () => void }) {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState(user?.username ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [removed, setRemoved] = useState(false);
  const [usernameError, setUsernameError] = useState<string>();
  const [fileError, setFileError] = useState<string>();
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const picked = event.target.files?.[0];
    event.target.value = ""; // lets the user re-pick the same file later
    if (!picked) return;

    if (!ALLOWED_TYPES.includes(picked.type)) {
      setFileError("Choose a JPG, PNG or WebP image.");
      return;
    }
    if (picked.size > MAX_AVATAR_BYTES) {
      setFileError("Image must be 2 MB or smaller.");
      return;
    }

    setFileError(undefined);
    setFile(picked);
    setPreviewUrl(URL.createObjectURL(picked));
    setRemoved(false);
  }

  function handleRemove() {
    setFile(null);
    setPreviewUrl(null);
    setFileError(undefined);
    setRemoved(true);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;

    const error = validateUsername(username);
    setUsernameError(error);
    if (error) return;

    setFormError(null);
    setIsSaving(true);
    try {
      const name = username.trim();

      if (file) {
        const res = await userService.uploadAvatar(file);
        updateUser(res.user);
      }
      if (removed || name !== user.username) {
        const res = await userService.updateProfile(
          removed ? { username: name, avatar: "" } : { username: name },
        );
        updateUser(res.user);
      }
      onClose();
    } catch (err) {
      setFormError(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  }

  if (!user) return null;

  const shownSrc = previewUrl ?? (removed ? "" : user.avatar);

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-3 pb-2">
        <Avatar
          key={shownSrc}
          username={username.trim() || user.username}
          src={shownSrc}
          size="lg"
        />
        <p className="text-sm text-fg-3">{user.email}</p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex gap-2">
          <Button
            type="button"
            variant="glass"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose photo
          </Button>
          {shownSrc && (
            <Button type="button" variant="glass" onClick={handleRemove}>
              Remove photo
            </Button>
          )}
        </div>
        {fileError && (
          <p role="alert" className="text-sm text-danger">
            {fileError}
          </p>
        )}
      </div>

      <TextField
        label="Username"
        autoComplete="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        error={usernameError}
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
