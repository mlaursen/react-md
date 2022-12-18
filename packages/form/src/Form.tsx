import type { FormHTMLAttributes } from "react";
import { forwardRef } from "react";

const noop = (): void => {
  // do nothing
};

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /**
   * Boolean if the form should no longer prevent default submit behavior. If
   * you enable this prop you should honestly just use a `<form>` element
   * instead
   *
   * @defaultValue `false`
   */
  disablePreventDefault?: boolean;
}

/**
 * This is probably one of the least useful components available as it doesn't
 * do much styling or logic. All this form component will do is add basic flex
 * behavior and prevent the default form submit behavior.
 */
export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  props,
  ref
) {
  const {
    children,
    onSubmit = noop,
    disablePreventDefault = false,
    ...remaining
  } = props;

  return (
    <form
      {...remaining}
      onSubmit={(event) => {
        if (!disablePreventDefault) {
          event.preventDefault();
        }

        onSubmit(event);
      }}
      ref={ref}
    >
      {children}
    </form>
  );
});
