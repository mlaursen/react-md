import { useEffect } from "react";

export function KeyboardShortcuts(): null {
  // const { showNav } = useLayoutConfig()
  useEffect(() => {
    const callback = (event: KeyboardEvent): void => {
      const { key, altKey, shiftKey } = event;
      if (!altKey && !shiftKey) {
        return;
      }

      let label = "";
      switch (key) {
        case "N":
          label = "Show Navigation";
          break;
        case "O":
          label = "Configuration";
          break;
      }

      if (!label) {
        return;
      }

      const button = document.querySelector<HTMLButtonElement>(
        `button[aria-label="${label}"]`
      );

      button?.focus();
      button?.click();
    };

    window.addEventListener("keydown", callback);

    return () => {
      window.removeEventListener("keydown", callback);
    };
  }, []);

  return null;
}
