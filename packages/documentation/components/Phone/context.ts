import { createContext, ReactNode, useContext } from "react";

interface PhoneContextType {
  id: string;
  title: ReactNode;
}

export const PhoneContext = createContext<PhoneContextType>({
  id: "",
  title: "Example",
});
export function usePhoneContext() {
  return useContext(PhoneContext);
}
