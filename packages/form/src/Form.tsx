import React, { FC, FormHTMLAttributes, forwardRef, useCallback } from "react";
import { WithForwardedRef, useRefCache } from "@react-md/utils";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /**
   * Boolean if the form should no longer prevent default submit behavior.
   */
  disableNoDefault?: boolean;
}

type WithRef = WithForwardedRef<HTMLFormElement>;
type DefaultProps = Required<Pick<FormProps, "disableNoDefault">>;
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
    disableNoDefault,
    onSubmit,
    ...props
  } = providedProps as WithDefaultProps;

  const config = useRefCache({ onSubmit, disableNoDefault });
  const handleOnSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    event => {
      const { onSubmit, disableNoDefault } = config.current;
      if (!disableNoDefault) {
        event.preventDefault();
      }

      if (onSubmit) {
        onSubmit(event);
      }
    },
    []
  );

  return (
    <form {...props} onSubmit={handleOnSubmit} ref={forwardedRef}>
      {children}
    </form>
  );
};

const defaultProps: DefaultProps = {
  disableNoDefault: false,
};

Form.defaultProps = defaultProps;

export default forwardRef<HTMLFormElement, FormProps>((props, ref) => (
  <Form {...props} forwardedRef={ref} />
));
