import React, { FunctionComponent, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  /**
   * An id for the `<input>` or `<textarea>` that this label is for. This is required
   * since all label's **should** point to a valid `<input>`/`<textarea>`.
   */
  htmlFor: string;

  /**
   * Boolean if the label should gain the error state.
   */
  error?: boolean;

  /**
   * Boolean if the label should gain the disabled state.
   */
  disabled?: boolean;

  /**
   * Boolean if the label should gain the active state. This should normally be enabled
   * whenever the `<input>`/`<textarea>` gain focus. This is really more for text input
   * than anything else, and probably shouldn't be used for checkbox, radio or switch
   * components.
   */
  active?: boolean;

  /**
   * Boolean if is a floating label. This will update the styles to make the label `position: absolute`
   * and change when any of the other `floating` props are toggled.
   */
  floating?: boolean;

  /**
   * Boolean if the label is a floating label and currently active. This is really used to apply
   * a smaller text size ans shift the label above the `<input>`/`<textarea>` when is is not blank
   * or currently in focus.
   */
  floatingActive?: boolean;

  /**
   * Boolean if the label is a floating label and currently not focused. This will update
   * the label to gain the normal label text color.
   */
  floatingInactive?: boolean;

  /**
   * Boolean if the label is a floating label and currently used alongside an outlined `<input>`/`<textarea>`
   * component. This will update the position and background color of the label so it covers the
   * top border.
   */
  floatingActiveOutline?: boolean;
}

type WithRef = WithForwardedRef<HTMLLabelElement>;
type DefaultProps = Required<
  Pick<
    LabelProps,
    | "error"
    | "active"
    | "disabled"
    | "floating"
    | "floatingActive"
    | "floatingInactive"
    | "floatingActiveOutline"
  >
>;
type WithDefaultProps = LabelProps & DefaultProps & WithRef;

const block = bem("rmd-form-label");

const Label: FunctionComponent<LabelProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
    children,
    error,
    active,
    disabled,
    floating,
    floatingActive,
    floatingInactive,
    floatingActiveOutline,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <label
      {...props}
      ref={forwardedRef}
      className={cn(
        block({
          error,
          active,
          disabled,
          floating,
          "floating-active": floatingActive,
          "floating-inactive": floatingInactive,
          "floating-active-outline": floatingActiveOutline,
        }),
        className
      )}
    >
      {children}
    </label>
  );
};

const defaultProps: DefaultProps = {
  error: false,
  active: false,
  disabled: false,
  floating: false,
  floatingActive: false,
  floatingInactive: false,
  floatingActiveOutline: false,
};

Label.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Label.displayName = "Label";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Label.propTypes = {
      htmlFor: PropTypes.string.isRequired,
      error: PropTypes.bool,
      active: PropTypes.bool,
      floating: PropTypes.bool,
      floatingActive: PropTypes.bool,
      floatingInactive: PropTypes.bool,
      floatingActiveOutline: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLLabelElement, LabelProps>((props, ref) => (
  <Label {...props} forwardedRef={ref} />
));
