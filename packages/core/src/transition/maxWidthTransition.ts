import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";
import { DISPLAY_NONE_CLASS } from "../utils/isElementVisible.js";

const styles = bem("rmd-max-width-transition");

export interface MaxWidthTransitionClassNameOptions {
  className?: string;

  disabled?: boolean;
  transitionIn: boolean;
}

export function maxWidthTransition(
  options: MaxWidthTransitionClassNameOptions
): string {
  const { disabled, className, transitionIn } = options;

  return cnb(
    !disabled && styles({ visible: transitionIn }),
    disabled && !transitionIn && DISPLAY_NONE_CLASS,
    className
  );
}
