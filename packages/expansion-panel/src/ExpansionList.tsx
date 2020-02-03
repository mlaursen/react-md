import React, {
  forwardRef,
  HTMLAttributes,
  KeyboardEventHandler,
  ReactElement,
  ReactNode,
  Ref,
} from "react";

export interface ExpansionListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * This should be 2 or more expansion panel components.
   */
  children: ReactNode;

  /**
   * The keydown event handler that allows for focusing the next/previous panel
   * as well as the first/last with keyboard shortcuts. This is provided by the
   * `usePanels` hook automatically.
   */
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
}

/**
 * This component is honestly not very helpful since it does not apply any
 * styles. It is a simple wrapper for a `<div>` that updates the props to
 * require the `children` and `onKeyDown` props.
 */
function ExpansionList(
  { children, ...props }: ExpansionListProps,
  ref?: Ref<HTMLDivElement>
): ReactElement {
  return (
    <div {...props} ref={ref}>
      {children}
    </div>
  );
}

const ForwardedExpansionList = forwardRef(ExpansionList);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedExpansionList.propTypes = {
      children: PropTypes.node.isRequired,
      className: PropTypes.string,
      onKeyDown: PropTypes.func.isRequired,
    };
  } catch (e) {}
}

export default ForwardedExpansionList;
