import {
  CSSProperties,
  FC,
  isValidElement,
  ReactElement,
  RefObject,
} from "react";

import {
  CollapseOptions,
  useCollapseTransition,
  useCollapsibleElement,
} from "./useCollapseTransition";

export interface CollapseChildrenProps {
  /**
   * A conditional style that should be applied to the child element. This will be provided if one
   * or more of the `minHeight`, `minPaddingBottom`, or `minPaddingTop` props are greater than 0 OR
   * the `isEmptyCollapsed` prop is set to `false` OR there are prop styles defined.
   */
  style?: CSSProperties;

  /**
   * The class name to apply that will allow for the child element to transition between collapsed
   * states.
   */
  className: string;

  /**
   * A ref that **must** be applied to the child element. The value provided to this has
   * to be an html element so that the dynamic max-height style can be calculated.
   */
  ref: RefObject<HTMLElement>;
}

export type CollapseChildrenRenderer = (
  props: CollapseChildrenProps
) => ReactElement;

export interface CollapseProps extends CollapseOptions {
  children: ReactElement<HTMLElement> | CollapseChildrenRenderer;
}

type DefaultProps = Required<
  Pick<
    CollapseProps,
    | "minHeight"
    | "minPaddingBottom"
    | "minPaddingTop"
    | "enterDuration"
    | "leaveDuration"
  >
>;
type WithDefaultProps = CollapseProps & DefaultProps;

const Collapse: FC<CollapseProps> = providedProps => {
  const { children, ...props } = providedProps as WithDefaultProps;
  // it's ok to dynamically do hooks here since I want the app to crash if the
  // dev is swapping between a clonable child and a children renderer function
  /* eslint-disable react-hooks/rules-of-hooks */
  if (isValidElement(children)) {
    return useCollapsibleElement(children, props);
  }

  const { rendered, transitionProps } = useCollapseTransition(props);
  if (!rendered) {
    return null;
  }

  return (children as CollapseChildrenRenderer)(transitionProps);
};

const defaultProps: DefaultProps = {
  minHeight: 0,
  minPaddingBottom: 0,
  minPaddingTop: 0,
  enterDuration: 250,
  leaveDuration: 200,
};

Collapse.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Collapse.displayName = "Collapse";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
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
    };
  }
}

export default Collapse;
