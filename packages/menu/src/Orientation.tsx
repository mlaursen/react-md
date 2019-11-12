/* eslint-disable react/prop-types */
import React, { createContext, FC, ReactNode, useContext } from "react";

type MenuOrientation = "horizontal" | "vertical";
const Orientation = createContext<MenuOrientation>("vertical");

export function useOrientation(): MenuOrientation {
  return useContext(Orientation);
}

interface OrientationProviderProps {
  orientation: MenuOrientation;
  children: ReactNode;
}

export const OrientationProvider: FC<OrientationProviderProps> = ({
  orientation,
  children,
}) => (
  <Orientation.Provider value={orientation}>{children}</Orientation.Provider>
);
