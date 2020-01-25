import React, { FC, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import {
  InteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";
import { bem, WithForwardedRef } from "@react-md/utils";
import { TextIconSpacing } from "@react-md/icon";

import { TabConfig } from "./types";

export interface TabProps
  extends TabConfig,
    HTMLAttributes<HTMLButtonElement>,
    Omit<InteractionStatesOptions<HTMLButtonElement>, "disableSpacebarClick"> {
  /**
   * The id for the tab. This is required for a11y and linking the `TabPanel` to
   * a specific tab.
   */
  id: string;

  /**
   * Boolean if the tab is currently active. Only one tab should be active at a time.
   */
  active: boolean;

  /**
   * The id for the `TabPanel` that the `Tab` controls. This is really just used to create
   * an `aria-controls` attribute on the `Tab` itself, but googling this results in some
   * "interesting" results showing `aria-controls` doesn't really do much so this prop
   * can be omitted.
   *
   * In addition, if you are using dynamically rendered tab panels, this value should only
   * be provided when the tab becomes active as the `id` will not exist in the DOM until
   * then and will be invalid.
   */
  panelId?: string;
}

type WithRef = WithForwardedRef<HTMLButtonElement>;
type DefaultProps = Required<
  Pick<TabProps, "disabled" | "stacked" | "iconAfter">
>;
type WithDefaultProps = TabProps & DefaultProps & WithRef;

const block = bem("rmd-tab");

/**
 * The `Tab` is a low-level component that just renders an accessible tab widget along with some
 * general styles and an optional icon.
 */
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
      className={cn(block({ active, stacked: icon && stacked }), className)}
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
      id: PropTypes.string.isRequired,
      panelId: PropTypes.string,
      active: PropTypes.bool.isRequired,
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
