import { createContext, ReactNode, useContext } from "react";

interface PhoneContextType {
  id: string;
  title: ReactNode;
  closePhone: () => void;
}

export const PhoneContext = createContext<PhoneContextType>({
  id: "",
  title: "Example",
  closePhone: () => {},
});

export function usePhoneContext(): PhoneContextType {
  return useContext(PhoneContext);
}
