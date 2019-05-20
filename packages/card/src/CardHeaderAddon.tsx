import React, { FunctionComponent, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";

const block = bem("rmd-card");

/**
 * This component is used to dynamically add addons to the `CardHeader` component.
 * When no children are provided, nothing will be rendered.
 *
 * @private
 */
const CardHeaderAddon: FunctionComponent<HTMLAttributes<HTMLSpanElement>> = ({
  className,
  children,
  ...props
}) => {
  if (!children) {
    return null;
  }

  return (
    <span {...props} className={cn(block("header-addon"), className)}>
      {children}
    </span>
  );
};

export default CardHeaderAddon;
