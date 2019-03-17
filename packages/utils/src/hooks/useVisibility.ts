import { useState, useRef, useCallback, useEffect } from "react";

/**
 * This hooks provides an easy way to toggle the visibility of another
 * component (or just keeps a boolean flag available).
 *
 * @param defaultVisible Boolean if the visibility should be enabled first render.
 * @return an object containing the visible state, and memoized callback functions
 * to show, hide, or toggle the visibility.
 */
export default function useVisibility(defaultVisible: boolean = false) {
  const [visible, setVisible] = useState(defaultVisible);
  const visibleRef = useRef(visible);
  useEffect(() => {
    visibleRef.current = visible;
  });

  const show = useCallback(() => {
    if (!visibleRef.current) {
      setVisible(true);
    }
  }, []);
  const hide = useCallback(() => {
    if (visibleRef.current) {
      setVisible(false);
    }
  }, []);

  const toggle = useCallback(() => {
    setVisible(prevVisible => !prevVisible);
  }, []);

  return { visible, show, hide, toggle };
}
