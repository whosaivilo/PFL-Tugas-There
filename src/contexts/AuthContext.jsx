import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Ambil session saat komponen mount
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchProfile(session.user);
      } else {
        setUser(null);
        setRole(null);
        setLoading(false);
      }
    };

    initializeAuth();

    // 2. Dengarkan perubahan status login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          await fetchProfile(session.user);
        } else {
          setUser(null);
          setRole(null);
          setLoading(false);
        }
      }
    );

    // Cleanup subscription
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Fungsi untuk mengambil role dari tabel profiles
  const fetchProfile = async (currentUser) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', currentUser.id)
        .single();
        
      if (!error && data) {
        setRole(data.role);
      } else if (error) {
        console.error("Error fetching profile role:", error.message);
      }
    } catch (err) {
      console.error("Unexpected error fetching profile:", err);
    } finally {
      setUser(currentUser);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {/* Jangan render anak-anaknya sampai status loading selesai */}
      {!loading ? children : (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3c5e2d]"></div>
        </div>
      )}
    </AuthContext.Provider>
  );
};
