import React, { CSSProperties, ReactElement, ReactNode } from "react";
import cn from "classnames";

export interface HighlightedResultProps {
  /**
   * An optional id to use for the `<span>`. This will be suffixed by the
   * current `index` if it was provided
   */
  id?: string;

  /**
   * An optional style to provide to the `<span>`.
   */
  style?: CSSProperties;

  /**
   * An optional className to provide to the `<span>`.
   */
  className?: string;

  /**
   * The match index which is automatically added when the `repeatable` prop is
   * used for nested matches.
   */
  index?: number;

  /**
   * The current value to match against.
   */
  value: string;

  /**
   * Boolean if the highlighting functionality should be enabled. Setting this
   * to false will just return the `children` instead.
   */
  enabled?: boolean;

  /**
   * Boolean if the highlighting can be repeated multiple times within the
   * children string.
   */
  repeatable?: boolean;

  /**
   * The children to highlight. If this is not a string, the highlight will not
   * work.
   */
  children: ReactNode;
}

/**
 * The `HighlightedResult` component can be used to bold specific letters
 * within the `children` if the `children` is a string.
 */
export function HighlightedResult({
  id: propId,
  style,
  className,
  enabled = true,
  value,
  children,
  repeatable = false,
  index = 0,
}: HighlightedResultProps): ReactElement {
  if (!enabled || !value || typeof children !== "string") {
    return <>{children}</>;
  }

  const i = children.toLowerCase().indexOf(value.toLowerCase());
  if (i === -1) {
    return <>{children}</>;
  }

  const end = i + value.length;
  let id = propId;
  if (id && index > 0) {
    id = `${id}-${index}`;
  }

  return (
    <>
      {i > 0 && children.substring(0, i)}
      <span
        id={id}
        style={style}
        className={cn("rmd-typography--bold", className)}
      >
        {children.substring(i, end)}
      </span>
      {end < children.length && (
        <HighlightedResult
          style={style}
          className={className}
          value={value}
          enabled={enabled && repeatable}
          repeatable={repeatable}
          index={index + 1}
        >
          {children.substring(end)}
        </HighlightedResult>
      )}
    </>
  );
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    HighlightedResult.propTypes = {
      id: PropTypes.string,
      index: PropTypes.number,
      value: PropTypes.string.isRequired,
      style: PropTypes.object,
      className: PropTypes.string,
      children: PropTypes.node,
      enabled: PropTypes.bool,
      repeatable: PropTypes.bool,
    };
  } catch (e) {}
}
