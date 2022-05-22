import { useElementInteraction } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";

import styles from "./Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: "icon" | "text";
  children: ReactNode;
}

export function Button(props: ButtonProps): ReactElement {
  const {
    type = "button",
    disabled = false,
    className,
    buttonType = "text",
    children,
    ...remaining
  } = props;
  const { pressed, ...handlers } = useElementInteraction({
    disabled,
    ...remaining,
  });

  return (
    <button
      {...remaining}
      {...handlers}
      type={type}
      className={cnb(
        styles.button,
        buttonType === "text" && styles.text,
        buttonType === "icon" && styles.icon,
        pressed && styles.pressed,
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
