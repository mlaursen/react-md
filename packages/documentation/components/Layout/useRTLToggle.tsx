import { useEffect, useMemo } from "react";
import { useToggle } from "@react-md/utils";

export default function useRTLToggle() {
  const defaultToggled = useMemo(() => {
    if (typeof document === "undefined") {
      return false;
    }

    const html = document.querySelector("html") as HTMLElement;
    return html.getAttribute("dir") === "rtl";
  }, []);
  const { toggled: isRTL, toggle: toggleRTL } = useToggle(defaultToggled);

  useEffect(() => {
    const html = document.querySelector("html") as HTMLElement;
    if (isRTL) {
      html.setAttribute("dir", "rtl");
    } else {
      html.setAttribute("dir", "ltr");
    }
  }, [isRTL]);

  return { isRTL, toggleRTL };
}
