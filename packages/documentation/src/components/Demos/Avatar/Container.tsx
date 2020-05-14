import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";

import styles from "./Container.module.scss";

const Container: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn(styles.container, className)} {...props}>
    {children}
  </div>
);

export default Container;
