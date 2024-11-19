// AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export interface User extends SupabaseUser {
  firstName: string;
  lastName: string;
  major: string;
  graduationYear: number;
  bio?: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const transformUser = async (
  supabaseUser: SupabaseUser | null
): Promise<User | null> => {
  if (!supabaseUser) return null;

  try {
    const { data: userData, error } = await supabase
      .from("users")
      .select("firstName, lastName, major, graduationYear, bio, profilePicture")
      .eq("auth_id", supabaseUser.id)
      .single();

    if (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }

    if (!userData) {
      console.error("No user data found for auth_id:", supabaseUser.id);
      return null;
    }

    return {
      ...supabaseUser,
      firstName: userData.firstName,
      lastName: userData.lastName,
      major: userData.major,
      graduationYear: userData.graduationYear,
      bio: userData.bio,
      profilePicture: userData.profilePicture,
    };
  } catch (error) {
    console.error("Error transforming user:", error);
    return null;
  }
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (mounted) {
          const transformedUser = await transformUser(session?.user ?? null);
          setUser(transformedUser);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (mounted) {
        const transformedUser = await transformUser(session?.user ?? null);
        setUser(transformedUser);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
