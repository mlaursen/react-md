import { useEffect } from "react";
import { useToggle } from "@react-md/utils";

const TEN_SECONDS = 10000;

export default function useTemporaryToggle(duration: number = TEN_SECONDS) {
  const [toggled, , disable, toggle] = useToggle(false);
  useEffect(() => {
    let timeout: number | undefined = window.setTimeout(() => {
      timeout = undefined;
      disable();
    }, duration);

    return () => window.clearTimeout(timeout);
  }, [toggled]);

  return { toggle, toggled, disable };
}
