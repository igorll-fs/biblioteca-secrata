import { createContext, useContext, useState, useEffect } from 'react';
import pb from '../lib/pocketbase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(pb.authStore.model);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange(() => {
      setCurrentUser(pb.authStore.model);
    });
    setLoading(false);
    return unsubscribe;
  }, []);

  async function loginWithEmail(email, password) {
    const authData = await pb.collection('users').authWithPassword(email, password);
    setCurrentUser(authData.record);
    return authData.record;
  }

  async function loginWithGoogle() {
    const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
    setCurrentUser(authData.record);
    return authData.record;
  }

  async function register(email, password, passwordConfirm, name) {
    const user = await pb.collection('users').create({
      email,
      password,
      passwordConfirm,
      name,
    });
    await loginWithEmail(email, password);
    return user;
  }

  function logout() {
    pb.authStore.clear();
    setCurrentUser(null);
  }

  const value = {
    currentUser,
    loading,
    loginWithEmail,
    loginWithGoogle,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
