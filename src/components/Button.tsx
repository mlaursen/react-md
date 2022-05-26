import { RippleContainer, useElementInteraction } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { Children, isValidElement } from "react";
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
    children: propChildren,
    ...remaining
  } = props;
  const { pressed, handlers, rippleContainerProps } = useElementInteraction({
    disabled,
    ...remaining,
  });

  let children = propChildren;
  if (true && typeof children === "string") {
    children = Children.map(children, (child, i) => {
      if (typeof child === "string" || typeof child === "number") {
        return <span key={i}>{child}</span>;
      }

      return child;
    });
  }

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
      <RippleContainer {...rippleContainerProps} />
    </button>
  );
}
