import React, { FormHTMLAttributes, forwardRef, useCallback } from "react";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /**
   * Boolean if the form should no longer prevent default submit behavior. If
   * you enable this prop you should honestly just use a `<form>` element
   * instead
   */
  disablePreventDefault?: boolean;
}

/**
 * This is probably one of the least useful components available as it doesn't
 * do much styling or logic. All this form component will do is add basic flex
 * behavior and prevent the default form submit behavior.
 */
export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { children, disablePreventDefault = false, onSubmit, ...props },
  ref
) {
  const handleOnSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (event) => {
      if (!disablePreventDefault) {
        event.preventDefault();
      }

      if (onSubmit) {
        onSubmit(event);
      }
    },
    [disablePreventDefault, onSubmit]
  );

  return (
    <form {...props} onSubmit={handleOnSubmit} ref={ref}>
      {children}
    </form>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Form.propTypes = {
      children: PropTypes.node,
      onSubmit: PropTypes.func,
      disablePreventDefault: PropTypes.bool,
    };
  } catch (e) {}
}
