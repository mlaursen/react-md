import React, { forwardRef } from "react";
import cn from "classnames";
import {
  bem,
  LabelRequiredForA11y,
  SpinButton,
  BaseSpinButtonProps,
} from "@react-md/utils";
import { TimeFormat } from "./constants";

const styles = bem("rmd-time-spinbutton");

export interface BaseTimeSpinButtonProps
  extends Omit<BaseSpinButtonProps, "min" | "max"> {
  format: TimeFormat;
}

export type TimeSpinButtonProps = LabelRequiredForA11y<BaseTimeSpinButtonProps>;

export const TimeSpinButton = forwardRef<HTMLSpanElement, TimeSpinButtonProps>(
  function TimeSpinButton(
    { className, format, disabled = false, children, ...props },
    ref
  ) {
    let min: number;
    let max: number;
    switch (format) {
      case "HH":
        min = 0;
        max = 24;
        break;
      case "hh":
        min = 1;
        max = 12;
        break;
      case "mm":
      case "ss":
        min = 0;
        max = 59;
        break;
      case "sss":
        min = 0;
        max = 999;
        break;
      default:
        throw new Error("Unsupported TimeFormat");
    }

    return (
      <SpinButton
        {...props}
        min={min}
        max={max}
        ref={ref}
        className={cn(styles({ disabled }), className)}
      >
        {children}
      </SpinButton>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    TimeSpinButton.propTypes = {
      format: PropTypes.oneOf([
        TimeFormat.MILITARY_HOURS,
        TimeFormat.STANDARD_HOURS,
        TimeFormat.MINUTES,
        TimeFormat.SECONDS,
        TimeFormat.MILLISECONDS,
      ]).isRequired,
    };
  } catch (e) {}
}
