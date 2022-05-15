import type { ReactNode } from "react";
import { createContext, useContext } from "react";

interface PhoneContextType {
  id: string;
  title: ReactNode;
  closePhone: () => void;
}

export const PhoneContext = createContext<PhoneContextType>({
  id: "",
  title: "Example",
  closePhone: () => {
    // do nothing
  },
});

export function usePhoneContext(): PhoneContextType {
  return useContext(PhoneContext);
}
