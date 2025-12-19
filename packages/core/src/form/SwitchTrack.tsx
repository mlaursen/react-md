import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

import { type PropsWithRef } from "../types.js";
import { switchBall, switchTrack } from "./switchStyles.js";

export interface SwitchTrackProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  active?: boolean;
  disabled?: boolean;
  ballAddon?: ReactNode;
  ballProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>>;
  ballStyle?: CSSProperties;
  ballClassName?: string;
}

/**
 * Used to create the switch track styles
 * @internal
 */
export function SwitchTrack(props: SwitchTrackProps): ReactElement {
  const {
    ref,
    style,
    className,
    ballAddon,
    ballProps,
    ballStyle,
    ballClassName,
    active,
    children,
    disabled = false,
    ...remaining
  } = props;

  return (
    <div
      {...remaining}
      ref={ref}
      style={style}
      className={switchTrack({ disabled, className })}
    >
      {children}
      <span
        style={ballStyle}
        {...ballProps}
        className={switchBall({ className: ballClassName, active })}
      >
        {ballAddon}
        {ballProps?.children}
      </span>
    </div>
  );
}
