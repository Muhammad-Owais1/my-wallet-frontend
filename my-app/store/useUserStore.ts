import { create } from "zustand";

type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  usd: number;
  gbp: number;
  cad: number;
} | null;

type AuthState = {
  user: User;
  setUser: (user: Exclude<User, null>) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
