import {
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

import { Elevation } from "../elevation/Elevation.js";
import { type ButtonClassNameOptions, button } from "./styles.js";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonClassNameOptions {
  ref?: Ref<HTMLButtonElement>;

  /** @defaultValue `"button"` */
  type?: "button" | "reset" | "submit";

  children: ReactNode;
}

export function Button(props: Readonly<ButtonProps>): ReactElement {
  const {
    ref,
    type = "button",
    size,
    shape,
    variant,
    className,
    children,
    ...remaining
  } = props;
  const { disabled } = props;

  return (
    <button
      {...remaining}
      ref={ref}
      type={type}
      className={button({
        className,
        disabled,
        size,
        shape,
        variant,
      })}
    >
      {children}
      {(variant === "elevated" || variant === "tonal") && <Elevation />}
    </button>
  );
}
