"use client";
import { createContext, useState, useContext } from "react";

type User = {
  username: string;
  password: string;
  userId: string;
  imageUrl: string;
};

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
}
const defaultContextValue: UserContextType = {
  user: null,
  setUser: () => {},
};
const UserContext = createContext<UserContextType>(defaultContextValue);

export function UserWrapper({ children }: { children: React.ReactNode }) {
  let [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
