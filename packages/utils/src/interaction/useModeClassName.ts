import { useEffect } from "react";
import { UserInteractionMode } from "./useModeDetection";

/**
 * This hook will apply the current mode class name to the `document.body` so
 * that the specific mode style mixins work as expected.
 *
 * @private
 */
export default function useModeClassName(mode: UserInteractionMode): void {
  useEffect(() => {
    const className = `rmd-utils--${mode}`;
    document.body.classList.add(className);

    return () => {
      document.body.classList.remove(className);
    };
  }, [mode]);
}
