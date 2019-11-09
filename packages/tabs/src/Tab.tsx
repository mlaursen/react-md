import React, {
  FC,
  HTMLAttributes,
  forwardRef,
  ReactNode,
  CSSProperties,
} from "react";
import cn from "classnames";
import {
  InteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";
import { bem, WithForwardedRef } from "@react-md/utils";
import { TextIconSpacing } from "@react-md/icon";

export interface TabProps
  extends HTMLAttributes<HTMLButtonElement>,
    Omit<InteractionStatesOptions<HTMLButtonElement>, "disableSpacebarClick"> {
  id: string;
  panelId?: string;
  icon?: ReactNode;
  active: boolean;
  disabled?: boolean;
  stacked?: boolean;
  contentStyle?: CSSProperties;
  contentClassName?: string;
  iconAfter?: boolean;
}

type WithRef = WithForwardedRef<HTMLButtonElement>;
type DefaultProps = Required<
  Pick<TabProps, "disabled" | "stacked" | "iconAfter">
>;
type WithDefaultProps = TabProps & DefaultProps & WithRef;

const block = bem("rmd-tab");

const Tab: FC<TabProps & WithRef> = providedProps => {
  const {
    className: propClassName,
    contentStyle,
    contentClassName,
    forwardedRef,
    icon,
    stacked,
    iconAfter,
    children,
    active,
    panelId,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
    enablePressedAndRipple,
    ...props
  } = providedProps as WithDefaultProps;
  const { disabled } = props;

  const { ripples, className, handlers } = useInteractionStates({
    handlers: props,
    className: propClassName,
    disabled,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
    enablePressedAndRipple,
  });

  return (
    <button
      {...props}
      {...handlers}
      aria-selected={active}
      aria-controls={panelId}
      type="button"
      role="tab"
      className={cn(block({ active, stacked }), className)}
      ref={forwardedRef}
      tabIndex={active ? undefined : -1}
    >
      <TextIconSpacing icon={icon} stacked={stacked} iconAfter={iconAfter}>
        <span
          style={contentStyle}
          className={cn(block("content"), contentClassName)}
        >
          {children}
        </span>
      </TextIconSpacing>
      {ripples}
    </button>
  );
};

const defaultProps: DefaultProps = {
  stacked: false,
  iconAfter: false,
  disabled: false,
};

Tab.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Tab.displayName = "Tab";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Tab.propTypes = {
      className: PropTypes.string,
      contentStyle: PropTypes.object,
      contentClassName: PropTypes.string,
      children: PropTypes.node,
      icon: PropTypes.node,
      stacked: PropTypes.bool,
      iconAfter: PropTypes.bool,
      disabled: PropTypes.bool,
      onKeyDown: PropTypes.func,
      forwardedRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    };
  }
}

export default forwardRef<HTMLButtonElement, TabProps>((props, ref) => (
  <Tab {...props} forwardedRef={ref} />
));
