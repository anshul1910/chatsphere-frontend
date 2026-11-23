import { useEffect, useState } from "react";
import { userService } from "../api/services";
import type { PublicUser } from "../types/user";
import { getErrorMessage } from "../utils/getErrorMessage";
import { useDebounce } from "./useDebounce";

const MIN_QUERY_LENGTH = 2;

interface SearchResult {
  query: string;
  users: PublicUser[];
  error: string | null;
}

export function useUserSearch(rawQuery: string) {
  const query = useDebounce(rawQuery.trim(), 300);
  const isSearchable = query.length >= MIN_QUERY_LENGTH;
  const [result, setResult] = useState<SearchResult | null>(null);

  useEffect(() => {
    if (!isSearchable) return;

    const controller = new AbortController();

    userService
      .searchUsers(query, controller.signal)
      .then((res) => setResult({ query, users: res.users, error: null }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setResult({ query, users: [], error: getErrorMessage(err) });
      });

    return () => controller.abort();
  }, [query, isSearchable]);

  const isCurrent = isSearchable && result?.query === query;

  return {
    users: isSearchable ? (result?.users ?? []) : [],
    isLoading: isSearchable && !isCurrent,
    error: isCurrent ? result.error : null,
    hasSearched: isCurrent && result.error === null,
  };
}
