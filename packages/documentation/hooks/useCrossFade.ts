import { useState, useEffect } from "react";
import cn from "classnames";

// this is kind of hacky and I'm not sure of a better way to do this yet,
// but we don't want the cross-fade to be triggered on first page load only
// every other page transition. probably want to change this into a hook that
// returns a function to do the class name transition.
let rendered = false;

export default function useCrossFade(baseClassName?: string) {
  if (typeof window === "undefined") {
    // never trigger this server side
    return baseClassName;
  }
  if (!rendered) {
    rendered = true;
    return baseClassName;
  }

  const [className, setClassName] = useState<string | undefined>(
    cn("cross-fade", baseClassName)
  );

  useEffect(() => {
    let timeout: number | undefined;
    let frame: number | undefined = window.requestAnimationFrame(() => {
      frame = undefined;
      setClassName(cn("cross-fade cross-fade--active", baseClassName));

      timeout = window.setTimeout(() => {
        timeout = undefined;
        setClassName(baseClassName);
      }, 300);
    });

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.clearTimeout(timeout);

      frame = undefined;
      timeout = undefined;
    };
  }, []);

  return className;
}
