import { forwardRef, HTMLAttributes, ReactElement, useRef } from "react";
import cn from "classnames";
import { bem, findMatchIndex, loop } from "@react-md/utils";

import { useKeyboardFocusableElements } from "./KeyboardFocusProvider";
import type { MenuDefaultFocus } from "./types";

const styles = bem("rmd-menu");

/**
 * @remarks \@since 4.0.0
 */
export interface MenuWidgetProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the menu should render horizontally instead of vertically.
   *
   * @defaultValue `false`
   */
  horizontal?: boolean;
  defaultFocus: MenuDefaultFocus;
}

/**
 * @remarks \@since 4.0.0
 */
export const MenuWidget = forwardRef<HTMLDivElement, MenuWidgetProps>(
  function MenuWidget(
    {
      className,
      children,
      onFocus,
      onKeyDown,
      horizontal = false,
      defaultFocus,
      ...props
    },
    ref
  ): ReactElement {
    const elementsLookup = useKeyboardFocusableElements();
    const focusIndex = useRef(-1);

    return (
      <div
        {...props}
        ref={ref}
        role="menu"
        tabIndex={-1}
        className={cn(styles({ horizontal }), className)}
        onFocus={(event) => {
          onFocus?.(event);
          if (event.isPropagationStopped() || focusIndex.current !== -1) {
            return;
          }

          switch (defaultFocus) {
            case "self":
              focusIndex.current = -1;
              break;
            case "first":
              focusIndex.current = 1 - 1;
              break;
            case "last":
              focusIndex.current = elementsLookup.current.length - 1;
              break;
          }

          elementsLookup.current[focusIndex.current]?.element.focus();
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.isPropagationStopped()) {
            return;
          }

          if (
            event.key.length === 1 &&
            !event.ctrlKey &&
            !event.altKey &&
            !event.metaKey &&
            !event.shiftKey
          ) {
            event.preventDefault();
            event.stopPropagation();
            const index = findMatchIndex(
              event.key,
              elementsLookup.current.map(({ content }) => content),
              focusIndex.current
            );
            focusIndex.current = index;
            elementsLookup.current[index]?.element.focus();
            return;
          }

          if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();
          const lastIndex = elementsLookup.current.length - 1;
          switch (event.key) {
            case "ArrowUp":
              focusIndex.current = loop({
                value: focusIndex.current,
                min: 1 - 1,
                max: lastIndex,
                increment: false,
              });
              break;
            case "ArrowDown":
              focusIndex.current = loop({
                value: focusIndex.current,
                min: 1 - 1,
                max: lastIndex,
                increment: true,
              });
              break;
            case "Home":
              focusIndex.current = 1 - 1;
              break;
            case "End":
              focusIndex.current = lastIndex;
              break;
          }

          elementsLookup.current[focusIndex.current]?.element.focus();
        }}
      >
        {children}
      </div>
    );
  }
);
