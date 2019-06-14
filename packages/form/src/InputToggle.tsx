import React, {
  CSSProperties,
  FC,
  InputHTMLAttributes,
  ReactNode,
  useCallback,
} from "react";
import cn from "classnames";
import { TextIconSpacing } from "@react-md/icon";
import { useInteractionStates } from "@react-md/states";
import { bem } from "@react-md/theme";
import { useRefCache, useToggle, WithForwardedRef } from "@react-md/utils";

import Label from "./Label";
import ToggleContainer from "./ToggleContainer";

export interface InputToggleProps
  extends InputHTMLAttributes<HTMLInputElement> {
  /**
   *
   * The id for the radio or checkbox. This is required for a11y and will
   * be used as the `htmlFor` attribute if the `label` prop is provided.
   */
  id: string;
  /**
   *
   * The ame for the radio or checkbox. This is required for a11y.
   */
  name: string;

  /**
   * The icon to use for either a radio or a checkbox.
   */
  icon?: ReactNode;
  containerStyle?: CSSProperties;
  containerClassName?: string;
  error?: boolean;
  inline?: boolean;
  stacked?: boolean;
  label?: ReactNode;
  iconAfter?: boolean;
}

interface CheckboxProps extends InputToggleProps {
  type: "checkbox";
}

interface RadioProps extends InputToggleProps {
  type: "radio";
}

type WithRef = WithForwardedRef<HTMLInputElement>;
type Props = CheckboxProps | RadioProps;
type DefaultProps = Required<
  Pick<
    InputToggleProps,
    "error" | "disabled" | "inline" | "stacked" | "iconAfter"
  >
>;
type WithDefaultProps = Props & DefaultProps & WithRef;

const block = bem("rmd-form-toggle");

const InputToggle: FC<Props & WithRef> = providedProps => {
  const {
    style,
    className: propClassName,
    containerStyle,
    containerClassName,
    icon,
    forwardedRef,
    onFocus,
    onBlur,
    onChange,
    error,
    inline,
    stacked,
    label,
    iconAfter,
    ...props
  } = providedProps as WithDefaultProps;
  const { id, type, disabled } = props;

  const { ripples, handlers, className } = useInteractionStates({
    handlers: props,
    disabled,
    className: propClassName,
  });

  const propHandlers = useRefCache({ onFocus, onBlur, onChange });

  const {
    toggled: focused,
    enable: setFocused,
    disable: setBlurred,
  } = useToggle();
  const handleFocus = useCallback<React.FocusEventHandler<HTMLInputElement>>(
    event => {
      const { onFocus } = propHandlers.current;
      if (onFocus) {
        onFocus(event);
      }

      setFocused();
    },
    []
  );

  const handleBlur = useCallback(event => {
    const { onBlur } = propHandlers.current;
    if (onBlur) {
      onBlur(event);
    }

    setBlurred();
  }, []);

  return (
    <ToggleContainer
      style={containerStyle}
      className={containerClassName}
      inline={inline}
      stacked={stacked}
    >
      <TextIconSpacing
        icon={
          label && (
            <Label htmlFor={id} error={error} disabled={disabled}>
              {label}
            </Label>
          )
        }
        iconAfter={!iconAfter}
      >
        <span
          style={style}
          className={cn(
            block({
              focused,
              disabled,
            }),
            className
          )}
        >
          <input
            {...props}
            {...handlers}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={forwardedRef}
            className={block("input")}
          />
          <span
            className={cn(
              block("icon", {
                circle: type === "radio",
                disabled,
              })
            )}
          >
            {icon}
          </span>
          {ripples}
        </span>
      </TextIconSpacing>
    </ToggleContainer>
  );
};

const defaultProps: DefaultProps = {
  error: false,
  inline: false,
  stacked: false,
  disabled: false,
  iconAfter: false,
};

InputToggle.defaultProps = defaultProps;

export default InputToggle;
