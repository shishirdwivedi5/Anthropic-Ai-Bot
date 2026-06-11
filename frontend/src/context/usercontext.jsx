import { createContext, useState } from "react";

export const UserContext = createContext();
export const UserMessage = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserMessCOntext = ({ children }) => {
  
  const [userMess, setuserMess] = useState([]);

  return (
    <UserMessage.Provider value={{ userMess, setuserMess }}>
      {children}
    </UserMessage.Provider>
  );
};
