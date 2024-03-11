import { createContext, useState } from "react";

export const dnsContext = createContext(null);

export function DnsContextProvider({ children }) {
  const [currZone, setCurrZone] = useState(null);
  const [zoneRecords, setZoneRecords] = useState([]);
  const [recordTobeEdited, setRecordTobeEdited] = useState(null);

  return (
    <dnsContext.Provider
      value={{
        currZone,
        setCurrZone,
        recordTobeEdited,
        setRecordTobeEdited,
        zoneRecords,
        setZoneRecords,
      }}
    >
      {children}
    </dnsContext.Provider>
  );
}
