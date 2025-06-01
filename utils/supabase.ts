import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, Session } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  }
});

const getSession = async (cb: (session: Session | null) => void) => {
  const { data: { session } } = await supabase.auth.getSession();
  cb(session);
}

const onSessionChange = async (cb: (session: Session | null) => void) => {
  supabase.auth.onAuthStateChange((_event, session) => {
    cb(session);
  });
}

const signUpWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error;

  return data
}

const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data
}

const logout = async () => {
  await supabase.auth.signOut()
}

export { getSession, logout, onSessionChange, signInWithEmail, signUpWithEmail };

