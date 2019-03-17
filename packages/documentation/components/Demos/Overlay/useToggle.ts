import { useState, useRef, useCallback, useEffect } from "react";

export default function useToggle() {
  const [visible, setVisible] = useState(false);
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
