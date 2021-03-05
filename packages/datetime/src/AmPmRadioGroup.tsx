import React, { forwardRef } from "react";
import cn from "classnames";
import { BaseRadioGroupProps, bem, RadioGroup } from "@react-md/utils";
import { TimePeriod } from "./format";

const styles = bem("rmd-am-pm");

/** @remarks \@since 2.7.0 */
export interface AmPmRadioGroupProps
  extends Omit<BaseRadioGroupProps, "items" | "value" | "onChange"> {
  /**
   * Boolean if this AM/PM radio group is required which will set the
   * `aria-required` attribute to `true` and conditionally set `aria-invalid`.
   */
  required?: boolean;

  /**
   * Bolean if the AM/OM radio group should use the `large` spec.
   *
   * Note: this only applies when the {@link stacked} from is `false`
   */
  large?: boolean;

  /**
   * Boolean if the time period is stacked instead of horizontal.
   */
  stacked?: boolean;

  /**
   * The current value for AM/PM radio group.
   */
  value: TimePeriod | "";

  /**
   * A function to call that will set the `value` for the AM/PM radio group.
   */
  onChange(nextValue: TimePeriod): void;
}

/**
 * @remarks \@since 2.7.0
 * @internal
 */
const TIME_PERIOD_ITEMS: readonly TimePeriod[] = ["AM", "PM"];

/**
 * This component allows the user to update the time to either be AM or PM for
 * 12-hour clocks.
 *
 * @remarks \@since 2.7.0
 */
export const AmPmRadioGroup = forwardRef<HTMLSpanElement, AmPmRadioGroupProps>(
  function TimePeriod(
    {
      "aria-label": propAriaLabel,
      "aria-labelledby": ariaLabelledBy,
      className,
      large = false,
      stacked = false,
      required = false,
      ...props
    },
    ref
  ) {
    let ariaLabel = propAriaLabel;
    if (!ariaLabel && !ariaLabelledBy) {
      ariaLabel = "AM/PM";
    }

    return (
      <RadioGroup
        {...props}
        ref={ref}
        aria-required={required || undefined}
        aria-invalid={required ? !props.value : undefined}
        aria-label={ariaLabel as string}
        aria-labelledby={ariaLabelledBy}
        className={cn(
          styles({
            stacked,
            inline: !stacked,
            "inline-large": !stacked && large,
          }),
          className
        )}
        items={TIME_PERIOD_ITEMS}
        getRadioClassName={({ checked, index }) =>
          styles("radio", {
            checked,
            top: stacked && index === 0,
            left: !stacked && index === 0,
            bottom: stacked && index === 1,
            right: !stacked && index === 1,
          })
        }
      />
    );
  }
);

/* instanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    AmPmRadioGroup.propTypes = {
      stacked: PropTypes.bool,
      value: PropTypes.oneOf(["AM", "PM", ""]),
      onChange: PropTypes.func.isRequired,
    };
  } catch (e) {}
}
