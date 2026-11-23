import { useState } from "react";
import { Button } from "../../components/common/Button";
import { Logo } from "../../components/common/Logo";
import { ThemeToggle } from "../../components/common/ThemeToggle";
import { useAuth } from "../../hooks/useAuth";
import { UserSearchModal } from "../../components/users/UserSearchModal";
import { ProfileModal } from "../../components/users/ProfileModal";

export function HomePage() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden p-6">
      <div className="orb -left-40 -top-44 size-140 bg-brand" />
      <div className="orb -right-36 -bottom-40 size-120 bg-signal" />

      <div className="glass relative z-10 w-full max-w-md animate-pop-in rounded-[28px] p-10 text-center">
        <div className="flex justify-center">
          <Logo size={56} />
        </div>
        <h1 className="mt-5 font-display text-3xl font-bold text-fg">
          Welcome, {user?.username}
        </h1>
        <p className="mt-2 text-fg-2">{user?.email}</p>
        <p className="mt-6 text-sm text-fg-3">
          You are logged in. The chat is coming in the next features.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <ThemeToggle />
          <Button variant="glass" onClick={logout}>
            Log out
          </Button>
          <Button onClick={() => setOpen(true)}>Find people</Button>
          <Button variant="glass" onClick={() => setProfileOpen(true)}>
            Profile
          </Button>
        </div>
      </div>

      <UserSearchModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(selected) => {
          console.log("Selected user:", selected);
          setOpen(false);
        }}
      />

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </div>
  );
}
