import type {
  ButtonClassNameThemeOptions,
  ButtonProps,
  PropsWithRef,
} from "@react-md/core";
import {
  applyRef,
  bem,
  Button,
  useDir,
  useIcon,
  useIntersectionObserver,
} from "@react-md/core";
import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useRef, useState } from "react";
import type { GetTabListScrollToOptions } from "./utils";
import { getTabListScrollToOptions } from "./utils";

const styles = bem("rmd-tablist-button");

export interface BaseTabListScrollButtonProps
  extends HTMLAttributes<HTMLDivElement>,
    ButtonClassNameThemeOptions {
  buttonProps?: PropsWithRef<ButtonProps, HTMLButtonElement>;
  disableTransition?: boolean;
  getScrollToOptions?: GetTabListScrollToOptions;
}

export interface TabListScrollButtonProps extends BaseTabListScrollButtonProps {
  type: "back" | "forward";
  vertical?: boolean;
}

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
  const icon = useIcon(type);
  const children = propChildren || icon;

  const root = useRef<HTMLElement | null>(null);
  const isRTL = useDir().dir === "rtl";
  const [disabled, setDisabled] = useState(!forward);
  const nodeRef = useIntersectionObserver({
    root,
    onUpdate: useCallback((entry) => {
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
        className={cnb(
          styles({
            left: !forward,
            right: forward,
          }),
          className
        )}
      >
        <Button
          aria-label={ariaLabel || iconButton ? type : undefined}
          theme={theme}
          themeType={themeType}
          buttonType={buttonType}
          disabled={propDisabled || disabled}
          {...buttonProps}
          className={cnb(styles("button"), buttonProps?.className)}
          onClick={(event) => {
            buttonProps?.onClick?.(event);
            const container = root.current;
            if (!container || event.isPropagationStopped()) {
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
