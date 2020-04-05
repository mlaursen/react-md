/* eslint-disable react/prop-types */
import React, { CSSProperties, FC, ReactNode } from "react";
import cn from "classnames";

/**
 * @private
 */
export interface HighlightedResultProps {
  id?: string;
  style?: CSSProperties;
  className?: string;
  index?: number;
  value: string;
  enabled?: boolean;
  repeatable?: boolean;
  children: ReactNode;
}

/**
 * @private
 */
const HighlightedResult: FC<HighlightedResultProps> = ({
  id: propId,
  style,
  className,
  enabled = true,
  value,
  children,
  repeatable = false,
  index = 0,
}) => {
  if (!enabled || !value || typeof children !== "string") {
    return <>{children}</>;
  }

  const i = children.toLowerCase().indexOf(value.toLowerCase());
  if (i === -1) {
    return <>{children}</>;
  }

  const end = i + value.length;
  let id = propId;
  if (index > 0) {
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
};

export default HighlightedResult;
