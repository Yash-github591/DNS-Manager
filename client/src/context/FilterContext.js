import { createContext, useState } from "react";

export const filterContext = createContext(null);

export function FilterContextProvider({ children }) {
  const [type, setType] = useState("Select");

  return (
    <filterContext.Provider
      value={{
        type,
        setType,
      }}
    >
      {children}
    </filterContext.Provider>
  );
}
