import { getSession, onSessionChange } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { createContext, use, useEffect, useState } from "react";

type AuthContextState = {
    session: Session | null;
}

const INITIAL_STATE: AuthContextState = {
    session: null,
}

export const AuthContext = createContext<AuthContextState>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  console.log({ session })

  useEffect(() => {
    getSession(setSession);
    onSessionChange(setSession);
  }, []);

  return (
    <AuthContext value={{ session }}>
      {children}
    </AuthContext>
  );
};

export const useAuth = () => {
    const context = use(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}