import React, {
  Children,
  cloneElement,
  FC,
  forwardRef,
  HTMLAttributes,
  isValidElement,
  useRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import cn from "classnames";
import { bem, WithForwardedRef, applyRef } from "@react-md/utils";

import PanelGroup from "./PanelGroup";
import { useTabs } from "./TabsManager";

export interface TabPanelsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if this component should no longer automatically reset the scrolling
   * to the top when the panel changes.
   */
  disableScrollFix?: boolean;

  /**
   * Boolean if the swiping transition should be disabled. If you want to add
   * a custom transition, you'll need to wrap the `TabPanel`'s children in a
   * custom component that does appear and exit animations.
   */
  disableTransition?: boolean;

  /**
   * Boolean if the conditional rendering for the active tab panel only should
   * be disabled. This means that all the children will be visible in the dom
   * instead of mounting and unmounting when their active state changes. The
   * panels will also be updated to ensure that inactive panels can not be
   * tab focusable.
   */
  persistent?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<
  Pick<TabPanelsProps, "disableScrollFix" | "disableTransition" | "persistent">
>;
type WithDefaultProps = TabPanelsProps & DefaultProps & WithRef;
const block = bem("rmd-tab-panels");

/**
 * This component allows you to control the visibility of the `TabPanel` components
 * and animating the next? and current panels as needed. This works by looping over
 * all the children and getting the current `TabPanel` by the `activeIndex`. This is
 * why the children for this component can only be `TabPanel` and should not be
 * conditional.
 */
const TabPanels: FC<TabPanelsProps & WithRef> = providedProps => {
  const {
    className,
    children,
    forwardedRef,
    disableScrollFix,
    disableTransition,
    persistent,
    ...props
  } = providedProps as WithDefaultProps;

  const { tabsId, tabs, activeIndex } = useTabs();
  const prevIndex = useRef(activeIndex);
  const [{ previous, incrementing }, setState] = useState({
    previous: activeIndex,
    incrementing: true,
  });

  const transitionable = useRef(!persistent && !disableTransition);
  const animimatable = useRef(persistent && !disableTransition);
  if (prevIndex.current !== activeIndex) {
    prevIndex.current = activeIndex;
    transitionable.current = !persistent && !disableTransition;
    animimatable.current = persistent && !disableTransition;
  }

  useEffect(() => {
    setState(({ previous }) => ({
      incrementing: previous < activeIndex,
      previous,
    }));
  }, [activeIndex]);

  const onEntered = useCallback(() => {
    setState(({ incrementing }) => ({ incrementing, previous: activeIndex }));
  }, [activeIndex]);

  const ref = useRef<HTMLDivElement | null>(null);
  const mergedRef = useCallback(
    (instance: HTMLDivElement | null) => {
      applyRef(instance, forwardedRef);
      ref.current = instance;
    },
    [forwardedRef]
  );

  useEffect(() => {
    if (!ref.current || disableScrollFix) {
      return;
    }

    ref.current.scrollTop = 0;
    // don't want it to be triggered if only the disableScrollFix prop has changed
    // since it might be independant from active indexes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <div
      {...props}
      ref={mergedRef}
      className={cn(
        block({
          "slide-left": incrementing && !persistent,
          "slide-left-persistent": incrementing && persistent,
          "slide-right": !incrementing,
        }),
        className
      )}
    >
      <PanelGroup persistent={persistent} disableTransition={disableTransition}>
        {Children.map(children, (child, index) => {
          if (!persistent && index !== activeIndex) {
            return null;
          }

          if (!isValidElement(child)) {
            return child;
          }

          const panel = Children.only(child);
          let labelledBy = panel.props["aria-labelledby"];
          if (!labelledBy && !panel.props["aria-label"]) {
            // generally guarenteed to be defined by this point since the TabsManager
            // will add ids if missing.
            labelledBy = tabs[index].id;
          }

          let key = panel.key || undefined;
          if (index === activeIndex && transitionable.current) {
            key = `${activeIndex}`;
          }

          let { in: animateIn } = panel.props;
          if (animimatable.current) {
            // when the persistent flag is in, I have too handle the TransitionGroup
            // `in` behavior manually based on activeIndex
            animateIn = index === activeIndex;
          }

          return cloneElement(child, {
            key,
            in: animateIn,
            id: `${tabsId}-panel-${index + 1}`,
            "aria-labelledby": labelledBy,
            hidden: persistent && (index !== activeIndex && index !== previous),
            onEntered: disableTransition ? undefined : onEntered,
          });
        })}
      </PanelGroup>
    </div>
  );
};

const defaultProps: DefaultProps = {
  disableScrollFix: false,
  disableTransition: false,
  persistent: false,
};

TabPanels.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  TabPanels.displayName = "TabPanels";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    TabPanels.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      disableScrollFix: PropTypes.bool,
      disableTransition: PropTypes.bool,
      persistent: PropTypes.bool,
      forwardedRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    };
  }
}

export default forwardRef<HTMLDivElement, TabPanelsProps>((props, ref) => (
  <TabPanels {...props} forwardedRef={ref} />
));
