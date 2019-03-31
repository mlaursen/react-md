import { useEffect } from "react";
import { useVisibility } from "@react-md/utils";

const TEN_SECONDS = 10000;

export default function useTemporaryToggle(duration: number = TEN_SECONDS) {
  const { visible, toggle, hide } = useVisibility();
  useEffect(() => {
    let timeout: number | undefined = window.setTimeout(() => {
      timeout = undefined;
      hide();
    }, duration);

    return () => window.clearTimeout(timeout);
  }, [visible]);

  return { toggle, visible };
}
