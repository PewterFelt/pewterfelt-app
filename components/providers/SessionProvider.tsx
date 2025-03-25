import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext<{
  session: Session | null;
  authChecked: boolean;
}>({
  session: null,
  authChecked: false,
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      setSession(session);
      if (!authChecked) setAuthChecked(true);
    });

    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setAuthChecked(true);
    };
    checkSession();

    return () => subscription?.unsubscribe();
  }, []);

  return (
    <SessionContext.Provider value={{ session, authChecked }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
