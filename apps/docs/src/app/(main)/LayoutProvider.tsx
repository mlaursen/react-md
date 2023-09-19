"use client";
import { useAppSize, useToggle } from "@react-md/core";
import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useRef } from "react";

interface LayoutContext {
  staticNavExpanded: boolean;
  temporaryNavVisible: boolean;
  showTemporaryNav(): void;
  hideTemporaryNav(): void;
  disableTransition: boolean;
  toggleNavigation(): void;
  onTemporaryTransitionComplete(): void;
}

const context = createContext<LayoutContext | null>(null);
const { Provider } = context;
context.displayName = "Layout";

export function useLayoutContext(): LayoutContext {
  const value = useContext(context);
  if (!value) {
    throw new Error();
  }

  return value;
}

export interface LayoutProviderProps {
  children: ReactNode;
}

export function LayoutProvider(props: LayoutProviderProps): ReactElement {
  const { children } = props;
  const {
    toggled: temporaryNavVisible,
    enable: showTemporaryNav,
    disable: hideTemporaryNav,
  } = useToggle();
  const { toggled: staticNavExpanded, toggle: toggleStaticNav } = useToggle();

  const { isPhone, isTablet } = useAppSize();
  const prevTemporary = useRef(isPhone);
  const isTemporary = isPhone || isTablet;
  useEffect(() => {
    if (!temporaryNavVisible && isTemporary && !prevTemporary.current) {
      prevTemporary.current = true;
    }
  }, [isTemporary, temporaryNavVisible]);

  const value = useMemo<LayoutContext>(
    () => ({
      toggleNavigation() {
        if (isTemporary) {
          showTemporaryNav();
        } else {
          toggleStaticNav();
        }
      },
      showTemporaryNav,
      hideTemporaryNav,
      temporaryNavVisible: temporaryNavVisible && isTemporary,
      disableTransition: isTemporary !== prevTemporary.current,
      staticNavExpanded,
      onTemporaryTransitionComplete() {
        prevTemporary.current = isTemporary;
      },
    }),
    [
      hideTemporaryNav,
      isTemporary,
      showTemporaryNav,
      staticNavExpanded,
      temporaryNavVisible,
      toggleStaticNav,
    ]
  );

  return <Provider value={value}>{children}</Provider>;
}
