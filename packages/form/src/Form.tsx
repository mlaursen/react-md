import React, {
  FormHTMLAttributes,
  forwardRef,
  ReactElement,
  Ref,
  useCallback,
} from "react";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /**
   * Boolean if the form should no longer prevent default submit behavior.
   */
  disablePreventDefault?: boolean;
}

/**
 * This is probably one of the least useful components available as it doesn't
 * do much styling or logic. All this form component will do is add basic flex
 * behavior and prevent the default form submit behavior.
 */
function Form(
  { children, disablePreventDefault = false, onSubmit, ...props }: FormProps,
  ref?: Ref<HTMLFormElement>
): ReactElement {
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
}

const ForwardedForm = forwardRef<HTMLFormElement, FormProps>(Form);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedForm.propTypes = {
      disablePreventDefault: PropTypes.bool,
    };
  } catch (e) {}
}

export default ForwardedForm;
