/* eslint-disable react/prop-types */
import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

const block = bem("rmd-card");

/**
 * This component is used to dynamically add addons to the `CardHeader`
 * component. When no children are provided, nothing will be rendered.
 *
 * @private
 */
const CardHeaderAddon: FC<HTMLAttributes<HTMLSpanElement>> = ({
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
