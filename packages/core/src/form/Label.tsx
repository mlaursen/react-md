import { forwardRef } from "react";

import { label } from "./labelStyles.js";
import { type LabelProps } from "./types.js";

/**
 * Most of the form components already use this `Label` internally when a
 * `label` prop has been provided. You should generally use this component if
 * you need to separate the label from an existing form component or you need to
 * create a custom implementation of a form component.
 *
 * @see {@link https://react-md.dev/components/select | Select Demos}
 * @see {@link https://react-md.dev/components/text-field | TextField Demos}
 * @see {@link https://react-md.dev/components/text-field#simple-textarea | TextArea Demos}
 * @since 6.0.0 Updated to be usable externally and combines the
 * floating label styles instead of having separate components.
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  function Label(props, ref) {
    const {
      gap,
      error,
      dense,
      active,
      stacked,
      reversed,
      disabled,
      floating,
      inactive,
      floatingActive = active,
      className,
      children,
      ...remaining
    } = props;

    return (
      <label
        ref={ref}
        {...remaining}
        className={label({
          gap,
          error,
          dense,
          active,
          stacked,
          reversed,
          disabled,
          floating,
          floatingActive,
          inactive,
          className,
        })}
      >
        {children}
      </label>
    );
  }
);
