import { createContext } from "react";

export interface User {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}
interface UserContextType {
  user: User | null;
  setUser: (value: User | null) => void;
  messageApi?: any;
}

export const UserContext = createContext<UserContextType | null>(null);
