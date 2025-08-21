import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User, Session } from "better-auth";
import { authClient } from "@/lib/auth";

export interface IAuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  // isInitialized: boolean;
}

export interface IAuthActions {
  signup: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ success: boolean; error?: string }>;
  signin: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signout: () => void;
  checkAuth: () => void;
}

export type AuthStore = IAuthState & IAuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // initial
      user: null,
      session: null,
      isLoading: false,

      // actions
      signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true });

        try {
          const result = await authClient.signUp.email({
            name: name,
            email: email,
            password: password,
            role: "artist",
          });

          if (result.data) {
            set({
              user: result.data.user,
              // session: result.data.session, // Added session
              isLoading: false,
            });

            return { success: true };
          } else {
            set({ isLoading: false });
            console.error("Sign up failed:", result.error);

            // Fix 1: Better error handling
            const errorMessage = result.error?.message || "Sign up failed";
            return { success: false, error: errorMessage };
          }
        } catch (err) {
          set({ isLoading: false });
          console.error("Sign up error:", err);

          // Fix 2: Proper error type handling
          const errorMessage =
            err instanceof Error ? err.message : "An unexpected error occurred";
          return { success: false, error: errorMessage };
        }
      },

      signin: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
          const result = await authClient.signIn.email({
            email: email,
            password: password,
          });

          if (result.data) {
            set({
              user: result.data.user,
              // session: result.data.session,
              isLoading: false,
            });

            return { success: true };
          } else {
            set({ isLoading: false });
            console.error("Sign in failed:", result.error);

            const errorMessage = result.error?.message || "Sign in failed";
            return { success: false, error: errorMessage };
          }
        } catch (err) {
          set({ isLoading: false });
          console.error("Sign in error:", err);

          const errorMessage =
            err instanceof Error ? err.message : "An unexpected error occurred";
          return { success: false, error: errorMessage };
        }
      },

      signout: async () => {
        set({ isLoading: true });

        try {
          await authClient.signOut();
          set({
            user: null,
            session: null,
            isLoading: false,
          });
        } catch (err) {
          set({ isLoading: false });
          console.error("Sign out error:", err);
        }
      },

      checkAuth: async () => {
        try {
          const session = await authClient.getSession();
          if (session.data) {
            set({
              user: session.data.user,
              session: session.data.session,
            });
          } else {
            set({ user: null, session: null });
          }
        } catch (err) {
          console.error("Auth check error:", err);
          set({ user: null, session: null });
        }
      },
    }),
    {
      name: "auth-storage", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({
        // Only persist these fields
        user: state.user,
        session: state.session,
      }),
    }
  )
);
