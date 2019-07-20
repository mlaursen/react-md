import React, { FC, FormHTMLAttributes, forwardRef, useCallback } from "react";
import { WithForwardedRef, useRefCache } from "@react-md/utils";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /**
   * Boolean if the form should no longer prevent default submit behavior.
   */
  disablePreventDefault?: boolean;
}

type WithRef = WithForwardedRef<HTMLFormElement>;
type DefaultProps = Required<Pick<FormProps, "disablePreventDefault">>;
type WithDefaultProps = FormProps & DefaultProps & WithRef;

/**
 * This is probably one of the least useful components available as it doesn't
 * do much styling or logic. All this form component will do is add basic flex
 * behavior and prevent the default form submit behavior.
 */
const Form: FC<FormProps & WithRef> = providedProps => {
  const {
    children,
    forwardedRef,
    disablePreventDefault,
    onSubmit,
    ...props
  } = providedProps as WithDefaultProps;

  const config = useRefCache({ onSubmit, disablePreventDefault });
  const handleOnSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    event => {
      const { onSubmit, disablePreventDefault } = config.current;
      if (!disablePreventDefault) {
        event.preventDefault();
      }

      if (onSubmit) {
        onSubmit(event);
      }
    },
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <form {...props} onSubmit={handleOnSubmit} ref={forwardedRef}>
      {children}
    </form>
  );
};

const defaultProps: DefaultProps = {
  disablePreventDefault: false,
};

Form.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Form.displayName = "Form";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Form.propTypes = {
      disablePreventDefault: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLFormElement, FormProps>((props, ref) => (
  <Form {...props} forwardedRef={ref} />
));
