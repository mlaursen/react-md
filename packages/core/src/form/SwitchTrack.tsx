import { cnb } from "cnbuilder";
import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import { type PropsWithRef } from "../types.js";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-switch");

export interface SwitchTrackProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  disabled?: boolean;
  ballProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
  ballStyle?: CSSProperties;
  ballClassName?: string;
}

/**
 * **Server Component**
 */
export const SwitchTrack = forwardRef<HTMLDivElement, SwitchTrackProps>(
  function SwitchTrack(props, ref) {
    const {
      style,
      className,
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
        className={cnb(styles("track", { disabled }), className)}
      >
        {children}
        <span
          style={ballStyle}
          {...ballProps}
          className={cnb(styles("ball", { active }), ballClassName)}
        />
      </div>
    );
  }
);
