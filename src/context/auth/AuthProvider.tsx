import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AuthContext, type AuthContextValue } from "./AuthContext";
import { authService } from "../../api/services";
import { AUTH_EXPIRED_EVENT } from "../../api/core/client";
import { tokenStorage } from "../../utils/tokenStorage";
import type { LoginPayload, RegisterPayload, User } from "../../types/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(
    () => tokenStorage.get() !== null,
  );

  // Restore the session on first load
  useEffect(() => {
    if (!tokenStorage.get()) return;

    authService
      .me()
      .then((res) => setUser(res.user))
      .catch(() => tokenStorage.clear())
      .finally(() => setIsLoading(false));
  }, []);

  // Log out when the API says our token is no longer valid
  useEffect(() => {
    const handleExpired = () => setUser(null);
    window.addEventListener(AUTH_EXPIRED_EVENT, handleExpired);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, handleExpired);
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const res = await authService.login(payload);
    tokenStorage.set(res.token);
    setUser(res.user);
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const res = await authService.register(payload);
    tokenStorage.set(res.token);
    setUser(res.user);
  }, []);

  const logout = useCallback(() => {
    tokenStorage.clear();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, login, register, logout }),
    [user, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
