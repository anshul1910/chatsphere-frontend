import { useState } from "react";
import { useUserSearch } from "../../hooks/useUserSearch";
import type { PublicUser } from "../../types/user";
import { Avatar } from "../common/Avatar";
import { SearchIcon } from "../common/icons";
import { Modal } from "../common/Modal";

interface UserSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (user: PublicUser) => void;
}

function SearchPanel({ onSelect }: { onSelect: (user: PublicUser) => void }) {
  const [query, setQuery] = useState("");
  const { users, isLoading, error, hasSearched } = useUserSearch(query);
  const trimmed = query.trim();

  return (
    <div>
      <div className="relative">
        <SearchIcon
          width={22}
          height={22}
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-fg-3"
        />
        <input
          autoFocus
          type="search"
          aria-label="Search people"
          placeholder="Search by username or exact email"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-2xl border border-line bg-field py-4 pr-4 pl-12 text-[17px] text-fg transition duration-150 placeholder:text-fg-3 focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </div>

      <p className="mt-5 mb-2 px-1 text-xs font-semibold tracking-[0.14em] text-fg-3 uppercase">
        People
      </p>

      <div className="min-h-44" aria-live="polite">
        {trimmed.length < 2 && (
          <p className="px-1 py-6 text-sm text-fg-3">
            Type at least 2 characters to search.
          </p>
        )}

        {error && (
          <p role="alert" className="px-1 py-6 text-sm text-danger">
            {error}
          </p>
        )}

        {isLoading && users.length === 0 && (
          <div className="flex flex-col gap-1" aria-label="Searching">
            {[0, 1, 2].map((item) => (
              <div key={item} className="flex items-center gap-3 p-3">
                <div className="size-11 animate-pulse rounded-full bg-glass-2" />
                <div className="h-3 w-1/3 animate-pulse rounded bg-glass-2" />
              </div>
            ))}
          </div>
        )}

        {hasSearched && users.length === 0 && (
          <p className="px-1 py-6 text-sm text-fg-3">
            No one found for “{trimmed}”.
          </p>
        )}

        {users.length > 0 && (
          <ul className="flex flex-col gap-1">
            {users.map((user, index) => (
              <li key={user.id}>
                <button
                  type="button"
                  onClick={() => onSelect(user)}
                  style={{ animationDelay: `${index * 40}ms` }}
                  className="flex w-full animate-fade-up cursor-pointer items-center gap-3 rounded-2xl border border-transparent p-3 text-left transition duration-150 hover:border-line hover:bg-glass active:scale-99 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <Avatar username={user.username} src={user.avatar} />
                  <span className="min-w-0 flex-1 truncate text-[15px] font-semibold text-fg">
                    {user.username}
                  </span>
                  <span className="rounded-xl border border-line bg-glass px-3.5 py-2 text-sm font-semibold text-fg">
                    Message
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-3 border-t border-line pt-3 text-right text-[13px] text-fg-3">
        Esc to close
      </p>
    </div>
  );
}

export function UserSearchModal({
  open,
  onClose,
  onSelect,
}: UserSearchModalProps) {
  return (
    <Modal open={open} onClose={onClose} position="top">
      <SearchPanel onSelect={onSelect} />
    </Modal>
  );
}
