import React, {
  createContext,
  FunctionComponent,
  useState,
  useEffect,
} from "react";

export interface ITooltipHoverModeContext {
  disabled: boolean;
  isActive: boolean;
  setActive: (isActive: boolean) => void;
}

export const TooltipHoverModeContext = createContext<ITooltipHoverModeContext>({
  disabled: true,
  isActive: false,
  setActive: () => {},
});

export const TooltipHoverMode: FunctionComponent<{ disabled?: boolean }> = ({
  children,
  disabled = false,
}) => {
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      setActive(false);
    }
  }, [disabled]);

  return (
    <TooltipHoverModeContext.Provider value={{ isActive, disabled, setActive }}>
      {children}
    </TooltipHoverModeContext.Provider>
  );
};
