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
  value: string;
  enabled: boolean;
  children: ReactNode;
}

/**
 * @private
 */
const HighlightedResult: FC<HighlightedResultProps> = ({
  id,
  style,
  className,
  enabled,
  value,
  children,
}) => {
  if (!enabled || !value || typeof children !== "string") {
    return <>{children}</>;
  }

  const i = children.toLowerCase().indexOf(value.toLowerCase());
  if (i === -1) {
    return <>{children}</>;
  }

  const end = i + value.length;
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
      {end < children.length && children.substring(end)}
    </>
  );
};

export default HighlightedResult;
