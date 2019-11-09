/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, {
  Children,
  cloneElement,
  FC,
  forwardRef,
  HTMLAttributes,
  isValidElement,
  Ref,
} from "react";
import cn from "classnames";
import { applyRef, bem, WithForwardedRef } from "@react-md/utils";

import useTabIndicatorStyle from "./useTabIndicatorStyle";
import useTabsMovement from "./useTabsMovement";

export type TabsAlignment = "left" | "center" | "right";

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  align?: TabsAlignment;
  orientation?: "horizontal" | "vertical";
  activeIndex: number;
  onActiveIndexChange: (activeIndex: number) => void;
  disableLazyMode?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<
  Pick<TabsProps, "align" | "orientation" | "disableLazyMode">
>;
type WithDefaultProps = TabsProps & DefaultProps & WithRef;

const block = bem("rmd-tabs");

/**
 * The `Tabs` component is the container for all the individual `Tab`s that
 * should be rendered. This handles adding an active indicator underneath
 * the active tab and animating it to the new location when a new tab becomes
 * active. It also handles the ability update which tab is selected when it
 * has been clicked or updated with keyboard movement.
 */
const Tabs: FC<TabsProps & WithRef> = providedProps => {
  const {
    style,
    className,
    forwardedRef,
    onClick,
    onKeyDown,
    children,
    align,
    orientation,
    activeIndex,
    onActiveIndexChange,
    disableLazyMode,
    ...props
  } = providedProps as WithDefaultProps;
  const horizontal = orientation === "horizontal";
  const { tabs, itemRefs, handleClick, handleKeyDown } = useTabsMovement({
    onClick,
    onKeyDown,
    children,
    horizontal,
    activeIndex,
    onActiveIndexChange,
    disableLazyMode,
  });
  const [mergedStyle, ref] = useTabIndicatorStyle({
    style,
    ref: forwardedRef,
    align,
    itemRefs,
    totalTabs: tabs.length,
    activeIndex,
  });

  return (
    <div
      {...props}
      aria-orientation={orientation}
      style={mergedStyle}
      role="tablist"
      className={cn(
        block({
          [align]: true,
          vertical: !horizontal,
        }),
        className
      )}
      ref={ref}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {Children.map(tabs, (child, i) => {
        if (!isValidElement(child)) {
          return child;
        }

        const tab = Children.only(child);
        let ref: Ref<HTMLElement> = itemRefs[i];
        if (tab.props.ref) {
          ref = (instance: HTMLElement | null) => {
            itemRefs[i].current = instance;
            applyRef(instance, tab.props.ref);
          };
        }

        return cloneElement(tab, { ref });
      })}
    </div>
  );
};

const defaultProps: DefaultProps = {
  align: "left",
  orientation: "horizontal",
  disableLazyMode: false,
};

Tabs.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Tabs.displayName = "Tabs";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Tabs.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      onKeyDown: PropTypes.func,
      disableLazyMode: PropTypes.bool,
      forwardedRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
      align: PropTypes.oneOf(["left", "center", "right"]),
      orientation: PropTypes.oneOf(["horizontal", "vertical"]),
    };
  }
}

export default forwardRef<HTMLDivElement, TabsProps>((props, ref) => (
  <Tabs {...props} forwardedRef={ref} />
));
