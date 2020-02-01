import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import cn from "classnames";
import { TextIconSpacing } from "@react-md/icon";
import {
  InteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";
import { bem } from "@react-md/utils";

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
   * Boolean if the tab is currently active. Only one tab should be active at a
   * time.
   */
  active: boolean;

  /**
   * The id for the `TabPanel` that the `Tab` controls. This is really just used
   * to create an `aria-controls` attribute on the `Tab` itself, but googling
   * this results in some "interesting" results showing `aria-controls` doesn't
   * really do much so this prop can be omitted.
   *
   * In addition, if you are using dynamically rendered tab panels, this value
   * should only be provided when the tab becomes active as the `id` will not
   * exist in the DOM until then and will be invalid.
   */
  panelId?: string;
}

const block = bem("rmd-tab");

/**
 * The `Tab` is a low-level component that just renders an accessible tab widget
 * along with some general styles and an optional icon.
 */
function Tab(
  {
    className: propClassName,
    contentStyle,
    contentClassName,
    disabled = false,
    icon,
    stacked = false,
    iconAfter = false,
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
  }: TabProps,
  ref?: Ref<HTMLButtonElement>
): ReactElement {
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
      ref={ref}
      aria-selected={active}
      aria-controls={panelId}
      type="button"
      role="tab"
      disabled={disabled}
      className={cn(block({ active, stacked: icon && stacked }), className)}
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
}

const ForwardedTab = forwardRef<HTMLButtonElement, TabProps>(Tab);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedTab.propTypes = {
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
    };
  } catch (e) {}
}

export default ForwardedTab;
