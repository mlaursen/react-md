import { useLayoutConfig } from "@react-md/layout";
import { useEffect } from "react";

export interface KeyboardShortcutsProps {
  showConfiguration(): void;
}

export function KeyboardShortcuts({
  showConfiguration,
}: KeyboardShortcutsProps): null {
  const { showNav } = useLayoutConfig();
  useEffect(() => {
    const callback = (event: KeyboardEvent): void => {
      const { key, altKey, shiftKey } = event;
      if (!altKey && !shiftKey) {
        return;
      }

      switch (key) {
        case "N":
          showNav();
          break;
        case "O":
          showConfiguration();
          break;
      }
    };

    window.addEventListener("keydown", callback);

    return () => {
      window.removeEventListener("keydown", callback);
    };
  }, [showConfiguration, showNav]);

  return null;
}
