import { createContext, useState } from "react";

export const dnsContext = createContext(null);

export function DnsContextProvider({ children }) {
  const [currZone, setCurrZone] = useState("");

  return (
    <dnsContext.Provider value={{ currZone, setCurrZone }}>
      {children}
    </dnsContext.Provider>
  );
}
