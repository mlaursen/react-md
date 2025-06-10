import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
} from "react";

import { type PropsWithRef } from "../types.js";
import { switchBall, switchTrack } from "./switchStyles.js";

export interface SwitchTrackProps extends HTMLAttributes<HTMLDivElement> {
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
export const SwitchTrack = forwardRef<HTMLDivElement, SwitchTrackProps>(
  function SwitchTrack(props, ref) {
    const {
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
);
