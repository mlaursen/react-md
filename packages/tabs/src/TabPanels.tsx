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
} from "react";
import cn from "classnames";
import { bem, WithForwardedRef, applyRef } from "@react-md/utils";
import TransitionGroup from "react-transition-group/TransitionGroup";
import { useTabs } from "./TabsManager";

export interface TabPanelsProps extends HTMLAttributes<HTMLDivElement> {
  activeIndex?: number;
  disableScrollFix?: boolean;
  disableTransition?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
const block = bem("rmd-tab-panels");

const TabPanels: FC<TabPanelsProps & WithRef> = providedProps => {
  const {
    className,
    children,
    activeIndex: propActiveIndex,
    forwardedRef,
    disableScrollFix,
    disableTransition,
    ...props
  } = providedProps;

  const context = useTabs();
  let activeIndex = propActiveIndex;
  if (typeof activeIndex === "undefined") {
    ({ activeIndex } = context);
  }

  const previous = useRef(activeIndex);
  const incrementing = useRef(true);
  if (previous.current !== activeIndex) {
    incrementing.current = activeIndex > previous.current;
    previous.current = activeIndex;
  }

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

  const panels = Children.toArray(children);
  let panel = panels[activeIndex];
  if (isValidElement(panel)) {
    let key: number | undefined;
    if (!disableTransition) {
      key = activeIndex;
    }

    const { tabsId, tabs } = context;
    let labelledBy = panel.props["aria-labelledby"];
    if (!labelledBy && !panel.props["aria-label"]) {
      // generally guarenteed to be defined by this point since the TabsManager
      // will add ids if missing.
      labelledBy = tabs[activeIndex].id;
    }

    panel = cloneElement(panel, {
      "aria-labelledby": labelledBy,
      id: `${tabsId}-panel-${activeIndex + 1}`,
      key,
    });
  }

  return (
    <div
      {...props}
      ref={mergedRef}
      className={cn(
        block({
          "slide-left": incrementing.current,
          "slide-right": !incrementing.current,
        }),
        className
      )}
    >
      <TransitionGroup
        component={null}
        appear={!disableTransition}
        enter={!disableTransition}
        exit={!disableTransition}
      >
        {panel}
      </TransitionGroup>
    </div>
  );
};

export default forwardRef<HTMLDivElement, TabPanelsProps>((props, ref) => (
  <TabPanels {...props} forwardedRef={ref} />
));
