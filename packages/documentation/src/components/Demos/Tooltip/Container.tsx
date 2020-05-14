import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";

import styles from "./Container.module.scss";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  stacked?: boolean;
}

const Container: FC<ContainerProps> = ({
  className,
  children,
  stacked,
  ...props
}) => (
  <div
    {...props}
    className={cn(
      styles.container,
      {
        [styles.stacked]: stacked,
      },
      className
    )}
  >
    {children}
  </div>
);

Container.defaultProps = {
  stacked: false,
};

export default Container;
