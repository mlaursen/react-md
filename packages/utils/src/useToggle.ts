import { useCallback, useState } from "react";
import useRefCache from "./useRefCache";

type DefaultToggled = boolean | (() => boolean);

/**
 * This hooks provides an easy way to toggle a boolean flag for React components.
 * The main use case for this will be toggling the visibility of something.
 *
 * @param defaultToggled Boolean if the visibility should be enabled first render.
 * @return an object containing the toggle state, and memoized callback functions
 * to enable, disable, or toggle the flag.
 */
export default function useToggle(defaultToggled: DefaultToggled = false) {
  const [toggled, setToggled] = useState(defaultToggled);
  const previous = useRefCache(toggled);

  const enable = useCallback(() => {
    if (!previous.current) {
      setToggled(true);
    }
  }, []);
  const disable = useCallback(() => {
    if (previous.current) {
      setToggled(false);
    }
  }, []);

  const toggle = useCallback(() => {
    setToggled(prevVisible => !prevVisible);
  }, []);

  return { toggled, enable, disable, toggle, setToggled };
}
