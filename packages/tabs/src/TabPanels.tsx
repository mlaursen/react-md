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

export interface TabPanelsProps extends HTMLAttributes<HTMLDivElement> {
  activeIndex: number;
  disableScrollFix?: boolean;
  disableTransition?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
const block = bem("rmd-tab-panels");

const TabPanels: FC<TabPanelsProps & WithRef> = providedProps => {
  const {
    className,
    children,
    activeIndex,
    forwardedRef,
    disableScrollFix,
    disableTransition,
    ...props
  } = providedProps;

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
  }, [activeIndex, disableScrollFix]);

  const panels = Children.toArray(children);
  let panel = panels[activeIndex];
  if (!disableTransition && isValidElement(panel)) {
    panel = cloneElement(panel, { key: activeIndex });
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
