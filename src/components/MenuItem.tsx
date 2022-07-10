/* eslint-disable */
import { RippleContainer, useElementInteraction } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { HTMLAttributes, ReactElement } from "react";

import styles from "./MenuItem.module.scss";

export type MenuItemProps = HTMLAttributes<HTMLDivElement>;

export function MenuItem(props: MenuItemProps): ReactElement {
  const { "aria-disabled": disabled, className, ...remaining } = props;
  const { pressed, handlers, rippleContainerProps } = useElementInteraction({
    onClick(event) {
      console.log("CLICK");
    },
    disabled: disabled === "false" || disabled === true,

    ...remaining,
  });

  return (
    <div
      {...remaining}
      {...handlers}
      className={cnb(styles.container, className)}
      tabIndex={0}
      role="menuitem"
    >
      MenuItem
      {rippleContainerProps && <RippleContainer {...rippleContainerProps} />}
    </div>
  );
}
