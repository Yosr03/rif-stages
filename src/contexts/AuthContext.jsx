import { createContext, useContext, useState, useEffect } from 'react';
import { HR_CREDENTIALS } from '../utils/constants';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('rif_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('rif_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simple HR authentication (will be replaced with Firebase Auth)
    if (email === HR_CREDENTIALS.email && password === HR_CREDENTIALS.password) {
      const userData = {
        email,
        role: 'hr',
        name: 'Responsable RH',
        loginAt: new Date().toISOString(),
      };
      setUser(userData);
      localStorage.setItem('rif_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Identifiants incorrects' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rif_user');
  };

  const isAuthenticated = () => !!user;
  const isHR = () => user?.role === 'hr';

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    isHR,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};