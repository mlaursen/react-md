"use client";

import {
  type HTMLAttributes,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from "react";

import { Button, type ButtonProps } from "../button/Button.js";
import { type ButtonClassNameThemeOptions } from "../button/buttonStyles.js";
import { getIcon } from "../icon/config.js";
import { type PropsWithRef } from "../types.js";
import { useDir } from "../typography/WritingDirectionProvider.js";
import { useIntersectionObserver } from "../useIntersectionObserver.js";
import { applyRef } from "../utils/applyRef.js";
import {
  type GetTabListScrollToOptions,
  getTabListScrollToOptions,
} from "./getTabListScrollToOptions.js";
import {
  tabListScrollButton,
  tabListScrollButtonContainer,
} from "./tabListScrollButtonStyles.js";

/**
 * @internal
 * @since 6.0.0
 */
export interface BaseTabListScrollButtonProps
  extends HTMLAttributes<HTMLDivElement>,
    ButtonClassNameThemeOptions {
  buttonProps?: PropsWithRef<ButtonProps, HTMLButtonElement>;

  /** @defaultValue `false` */
  disableTransition?: boolean;

  /** @defaultValue {@link getTabListScrollToOptions} */
  getScrollToOptions?: GetTabListScrollToOptions;
}

/**
 * @internal
 * @since 6.0.0
 */
export interface TabListScrollButtonProps extends BaseTabListScrollButtonProps {
  type: "back" | "forward";
  /** @defaultValue `false` */
  vertical?: boolean;
}

/**
 * **Client Component**
 *
 * @internal
 * @since 6.0.0
 */
export const TabListScrollButton = forwardRef<
  HTMLDivElement,
  TabListScrollButtonProps
>(function TabListScrollButton(props, ref) {
  const {
    "aria-label": ariaLabel,
    className,
    buttonProps,
    type,
    theme,
    themeType,
    buttonType = "icon",
    disabled: propDisabled,
    children: propChildren,
    getScrollToOptions = getTabListScrollToOptions,
    vertical = false,
    disableTransition = false,
    ...remaining
  } = props;

  const forward = type === "forward";
  const iconButton = buttonType === "icon";
  const icon = getIcon(type);
  const children = propChildren || icon;

  const root = useRef<HTMLElement | null>(null);
  const isRTL = useDir().dir === "rtl";
  const [disabled, setDisabled] = useState(!forward);
  const nodeRef = useIntersectionObserver({
    root,
    onUpdate: useCallback(([entry]) => {
      setDisabled(entry.intersectionRatio === 1);
    }, []),
  });

  return (
    <>
      {!forward && <span ref={nodeRef} />}
      <div
        {...remaining}
        ref={(instance) => {
          applyRef(instance, ref);
          root.current = instance?.parentElement || null;
        }}
        className={tabListScrollButtonContainer({
          forward,
          vertical,
          className,
        })}
      >
        <Button
          aria-label={ariaLabel || (iconButton ? type : undefined)}
          theme={theme}
          themeType={themeType}
          buttonType={buttonType}
          disabled={propDisabled || disabled}
          {...buttonProps}
          className={tabListScrollButton({
            className: buttonProps?.className,
            vertical,
          })}
          onClick={(event) => {
            buttonProps?.onClick?.(event);
            const container = root.current;
            if (!container) {
              return;
            }

            container.scrollTo(
              getScrollToOptions({
                isRTL,
                animate: !disableTransition,
                vertical,
                container,
                increment: forward,
              })
            );
          }}
        >
          {children}
        </Button>
      </div>
      {forward && <span ref={nodeRef} />}
    </>
  );
});
