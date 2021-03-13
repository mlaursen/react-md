/* eslint-disable react/prop-types */
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
} from "react";

type MenuOrientation = "horizontal" | "vertical";
const Orientation = createContext<MenuOrientation>("vertical");

export function useOrientation(): MenuOrientation {
  return useContext(Orientation);
}

interface OrientationProviderProps {
  orientation: MenuOrientation;
  children: ReactNode;
}

export function OrientationProvider({
  orientation,
  children,
}: OrientationProviderProps): ReactElement {
  return (
    <Orientation.Provider value={orientation}>{children}</Orientation.Provider>
  );
}
