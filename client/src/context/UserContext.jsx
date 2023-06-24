import { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const { data } = await axios.get("/profile");
        setUser(data);
        setReady(true);
      }
    };

    fetchUser();
  }, []);

  const value = useMemo(() => ({ user, setUser, ready }), [user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
