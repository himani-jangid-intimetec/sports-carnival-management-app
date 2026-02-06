import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUser, saveUser, StoredUser } from '../utils/authStorage';
import { RoleType } from '../constants/Roles';

type AuthContextType = {
  user: StoredUser | null;
  role: RoleType | null;
  setRole: (role: RoleType) => void;
  register: (user: StoredUser) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
};

type AuthContextProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [role, setRoleState] = useState<RoleType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getUser();
      if (storedUser) setUser(storedUser);
      setLoading(false);
    };
    loadUser();
  }, []);

  const setRole = (selectedRole: RoleType) => {
    setRoleState(selectedRole);
  };

  const register = async (newUser: StoredUser) => {
    await saveUser(newUser);
  };

  const login = async (email: string, password: string) => {
    const storedUser = await getUser();
    if (!storedUser) return false;

    if (storedUser.email === email && storedUser.password === password) {
      const userWithRole: StoredUser = {
        ...storedUser,
        role: role ?? storedUser.role,
      };

      setUser(userWithRole);
      await saveUser(userWithRole);
      return true;
    }

    return false;
  };

  const logout = async () => {
    setUser(null);
    setRoleState(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, role, setRole, register, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthStore = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthStore must be used inside AuthProvider');
  return ctx;
};
