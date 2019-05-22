import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
} from "react";

type MenuOrientation = "horizontal" | "vertical";
const Orientation = createContext<MenuOrientation>("vertical");

export function useOrientation() {
  return useContext(Orientation);
}

interface OrientationProviderProps {
  orientation: MenuOrientation;
  children: ReactNode;
}

export const OrientationProvider: FunctionComponent<
  OrientationProviderProps
> = ({ orientation, children }) => (
  <Orientation.Provider value={orientation}>{children}</Orientation.Provider>
);
