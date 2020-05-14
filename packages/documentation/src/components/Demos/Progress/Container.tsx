import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";

import styles from "./Container.module.scss";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  inline?: boolean;
}

const Container: FC<ContainerProps> = ({
  className,
  children,
  inline,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        styles.container,
        {
          [styles.inline]: inline,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
