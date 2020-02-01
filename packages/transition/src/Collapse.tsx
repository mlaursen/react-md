import { CSSProperties, isValidElement, ReactElement, RefObject } from "react";

import {
  CollapseOptions,
  useCollapseTransition,
  useCollapsibleElement,
} from "./useCollapseTransition";

export interface CollapseChildrenProps {
  /**
   * A conditional style that should be applied to the child element. This will
   * be provided if one or more of the `minHeight`, `minPaddingBottom`, or
   * `minPaddingTop` props are greater than 0 OR the `isEmptyCollapsed` prop is
   * set to `false` OR there are prop styles defined.
   */
  style?: CSSProperties;

  /**
   * The class name to apply that will allow for the child element to transition
   * between collapsed states.
   */
  className: string;

  /**
   * A ref that **must** be applied to the child element. The value provided to
   * this has to be an html element so that the dynamic max-height style can be
   * calculated.
   */
  ref: RefObject<HTMLElement>;
}

export type CollapseChildrenRenderer = (
  props: CollapseChildrenProps
) => ReactElement;

export interface CollapseProps extends CollapseOptions {
  children: ReactElement<HTMLElement> | CollapseChildrenRenderer;
}

function Collapse({
  children,
  minHeight = 0,
  minPaddingBottom = 0,
  minPaddingTop = 0,
  enterDuration = 250,
  leaveDuration = 200,
  disabled = false,
  ...props
}: CollapseProps): ReactElement | null {
  const config = {
    ...props,
    minHeight,
    minPaddingBottom,
    minPaddingTop,
    enterDuration,
    leaveDuration,
    disabled,
  };
  // it's ok to dynamically do hooks here since I want the app to crash if the
  // dev is swapping between a clonable child and a children renderer function
  /* eslint-disable react-hooks/rules-of-hooks */
  if (isValidElement(children)) {
    return useCollapsibleElement(children, config);
  }

  const { rendered, transitionProps } = useCollapseTransition(config);
  if (!rendered) {
    return null;
  }

  return (children as CollapseChildrenRenderer)(transitionProps);
}

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Collapse.propTypes = {
      style: PropTypes.object,
      className: PropTypes.string,
      collapsed: PropTypes.bool.isRequired,
      minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      minPaddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      minPaddingBottom: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      enterDuration: PropTypes.number,
      leaveDuration: PropTypes.number,
      isEmptyCollapsed: PropTypes.bool,
      children: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
        .isRequired,
      onExpanded: PropTypes.func,
      onCollapsed: PropTypes.func,
      disabled: PropTypes.bool,
    };
  } catch (e) {}
}

export default Collapse;
