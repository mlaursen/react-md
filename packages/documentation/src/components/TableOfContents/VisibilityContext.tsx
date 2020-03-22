import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useAppSize, useToggle } from "@react-md/utils";

interface TOCVisibility {
  visible: boolean;
  rendered: boolean;
}

const TOCVisibility = createContext<TOCVisibility>({
  visible: false,
  rendered: false,
});

interface TOCActionsContext {
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

const TOCActions = createContext<TOCActionsContext>({
  show: () => {},
  hide: () => {},
  toggle: () => {},
});

export const TOCVisibilityProvider: FC<{ pathname: string }> = ({
  children,
  pathname,
}) => {
  const { isLargeDesktop } = useAppSize();
  const [visible, show, hide, toggle] = useToggle(isLargeDesktop);

  useEffect(() => {
    if (isLargeDesktop) {
      show();
    } else {
      hide();
    }

    // disabled since I only want to update it on desktop changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLargeDesktop]);

  const rendered =
    pathname !== "/" &&
    pathname !== "/_error" &&
    !pathname.startsWith("/sandbox") &&
    !pathname.startsWith("/colors-and-theming/theme-builder") &&
    !pathname.includes("sassdoc");
  const actions = useMemo(() => ({ show, hide, toggle }), [hide, show, toggle]);
  const visibility = useMemo(
    () => ({
      visible,
      rendered,
    }),
    [rendered, visible]
  );

  return (
    <TOCVisibility.Provider value={visibility}>
      <TOCActions.Provider value={actions}>{children}</TOCActions.Provider>
    </TOCVisibility.Provider>
  );
};

export function useTOCVisibility(): TOCVisibility {
  return useContext(TOCVisibility);
}

export function useTOCActions(): TOCActionsContext {
  return useContext(TOCActions);
}
