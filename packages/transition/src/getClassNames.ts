import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";
import { defaults } from "@react-md/utils";

import { DefinedTimeout } from "./getTimeout";

type DefinedCSSTransitionClassNames = Required<CSSTransitionClassNames>;

/**
 * Gets an object of al the CSS class names to use for the useCSSTransition
 * hook. This will do some nice things like default the `appear` classes to the
 * `enter` classes if the provided classNames left the `appear` classes as
 * undefined but enabled the `appear` state.
 *
 * @internal
 */
export function getClassNames(
  classNames: CSSTransitionClassNames | string,
  timeout: DefinedTimeout
): DefinedCSSTransitionClassNames {
  if (typeof classNames === "string") {
    return {
      appear: timeout.appear ? `${classNames}--appear` : "",
      appearActive: timeout.appear ? `${classNames}--appear-active` : "",
      appearDone: "",
      enter: timeout.enter ? `${classNames}--enter` : "",
      enterActive: timeout.enter ? `${classNames}--enter-active` : "",
      enterDone: "",
      exit: timeout.exit ? `${classNames}--exit` : "",
      exitActive: timeout.exit ? `${classNames}--exit-active` : "",
      exitDone: "",
    };
  }

  return defaults(classNames, {
    appear: (timeout.appear && classNames.enter) || "",
    appearActive: (timeout.appear && classNames.enterActive) || "",
    appearDone: (timeout.appear && classNames.enterDone) || "",
    enter: "",
    enterActive: "",
    enterDone: "",
    exit: "",
    exitActive: "",
    exitDone: "",
  });
}
