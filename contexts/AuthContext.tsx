import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../src/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const logOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const isAdmin = user?.email === "saurabhmotalkar2021@gmail.com";

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logOut, isAdmin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
