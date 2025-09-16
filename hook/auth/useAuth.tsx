import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  token: string | null;
  userId: string | null;
  userType: string | null;
  login: (token: string, userId: string, userType: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const loadAuthData = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      const savedUserId = await AsyncStorage.getItem("userId");
      const savedUserType = await AsyncStorage.getItem("userType");

      if (savedToken && savedUserId && savedUserType) {
        setToken(savedToken);
        setUserId(savedUserId);
        setUserType(savedUserType);
      }
    };

    loadAuthData();
  }, []);

  const login = async (newToken: string, newUserId: string, newUserType: string) => {
    await AsyncStorage.setItem("token", newToken);
    await AsyncStorage.setItem("userId", newUserId);
    await AsyncStorage.setItem("userType", newUserType);

    setToken(newToken);
    setUserId(newUserId);
    setUserType(newUserType);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["token", "userId", "userType"]);
    setToken(null);
    setUserId(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};
