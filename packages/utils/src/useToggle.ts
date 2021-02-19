import { Dispatch, SetStateAction, useCallback, useState } from "react";

import { useRefCache } from "./useRefCache";

type Enable = () => void;
type Disable = () => void;
type Toggle = () => void;
type SetToggle = Dispatch<SetStateAction<boolean>>;

type ReturnValue = [boolean, Enable, Disable, Toggle, SetToggle];

/**
 * This hooks provides an easy way to toggle a boolean flag for React
 * components.  The main use case for this will be toggling the visibility of
 * something. All the provided actions are guaranteed to never change.
 *
 * @param defaultToggled - Boolean if the visibility should be enabled first
 * render.
 * @returns an array containing the toggled state, an enable function, a disable
 * function, a toggle function, and then a manual set toggle function.
 */
export function useToggle(
  defaultToggled: boolean | (() => boolean)
): ReturnValue {
  const [toggled, setToggled] = useState(defaultToggled);
  const previous = useRefCache(toggled);

  const enable = useCallback(() => {
    if (!previous.current) {
      setToggled(true);
    }
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const disable = useCallback(() => {
    if (previous.current) {
      setToggled(false);
    }
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = useCallback(() => {
    setToggled((prevVisible) => !prevVisible);
  }, []);

  return [toggled, enable, disable, toggle, setToggled];
}
