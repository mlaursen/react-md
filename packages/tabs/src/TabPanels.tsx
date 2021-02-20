import React, {
  Children,
  cloneElement,
  forwardRef,
  HTMLAttributes,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import { bem, useEnsuredRef } from "@react-md/utils";

import { PanelGroup } from "./PanelGroup";
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
   * be disabled. This means that all the children will be visible in the DOM
   * instead of mounting and unmounting when their active state changes. The
   * panels will also be updated to ensure that inactive panels can not be
   * tab focusable.
   */
  persistent?: boolean;
}

const block = bem("rmd-tab-panels");

/**
 * This component allows you to control the visibility of the `TabPanel`
 * components and animating the next and current panels as needed. This works by
 * looping over all the children and getting the current `TabPanel` by the
 * `activeIndex`. This is why the children for this component can only be
 * `TabPanel` and should not be conditional.
 */
export const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>(
  function TabPanels(
    {
      className,
      children,
      disableScrollFix = false,
      disableTransition = false,
      persistent = false,
      ...props
    },
    forwardedRef
  ) {
    const { tabsId, tabs, activeIndex } = useTabs();
    const prevIndex = useRef(activeIndex);
    const [{ previous, incrementing }, setState] = useState({
      previous: activeIndex,
      incrementing: true,
    });

    // have to set these in refs since changing these might cause mounting
    // and unmounting in the Transition group component :/ they should only
    // be re-evaluated when the activeIndex changes.
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
        previous: disableTransition ? activeIndex : previous,
      }));

      // this is for only updating the incrementing state and should not be fired
      // again if the disableTransition prop is changed
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);

    const onEntered = useCallback(() => {
      setState(({ incrementing }) => ({ incrementing, previous: activeIndex }));
    }, [activeIndex]);

    const [ref, refHandler] = useEnsuredRef(forwardedRef);

    useEffect(() => {
      if (!ref.current || disableScrollFix) {
        return;
      }

      ref.current.scrollTop = 0;
      // don't want it to be triggered if only the disableScrollFix prop has changed
      // since it might be independent from active indexes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);

    return (
      <div
        {...props}
        ref={refHandler}
        className={cn(
          block({
            "slide-left": incrementing && !persistent,
            "slide-left-persistent": incrementing && persistent,
            "slide-right": !incrementing,
          }),
          className
        )}
      >
        <PanelGroup
          persistent={persistent}
          disableTransition={disableTransition}
        >
          {Children.map(children, (child, index) => {
            if (!persistent && index !== activeIndex) {
              return null;
            }

            if (!isValidElement(child)) {
              return child;
            }

            const panel = Children.only(child);
            let labelledBy = panel.props["aria-labelledby"];
            if (!labelledBy && !panel.props["aria-label"] && tabs[index]) {
              // generally guaranteed to be defined by this point since the TabsManager
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

            let hidden = index !== activeIndex;
            if (persistent) {
              hidden = hidden && index !== previous;
            }
            return cloneElement(child, {
              key,
              in: animateIn,
              id: `${tabsId}-panel-${index + 1}`,
              "aria-labelledby": labelledBy,
              hidden,
              onEntered: disableTransition ? undefined : onEntered,
            });
          })}
        </PanelGroup>
      </div>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    TabPanels.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      disableScrollFix: PropTypes.bool,
      disableTransition: PropTypes.bool,
      persistent: PropTypes.bool,
    };
  } catch (e) {}
}
