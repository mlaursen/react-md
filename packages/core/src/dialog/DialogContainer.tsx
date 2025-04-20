import { type HTMLAttributes, type ReactNode, forwardRef } from "react";

import { dialogContainer } from "./styles.js";

/**
 * @since 6.0.0
 */
export interface ConfigurableDialogContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * Set to `true` to force the `Dialog` to be wrapped in a `DialogContainer`
   * div. This defaults to `true` for `type !== "custom"`.
   */
  enabled?: boolean;
}

/**
 * @since 6.0.0
 * @internal
 */
export interface DialogContainerProps extends ConfigurableDialogContainerProps {
  enabled: boolean;
  centered: boolean;
  displayNone: boolean;
  children: ReactNode;
}

/**
 * @since 6.0.0
 * @internal
 */
export const DialogContainer = forwardRef<HTMLDivElement, DialogContainerProps>(
  function DialogContainer(props, ref) {
    const {
      enabled,
      centered,
      displayNone,
      children,
      className,
      ...remaining
    } = props;

    if (!enabled) {
      return <>{children}</>;
    }

    return (
      <div
        {...remaining}
        ref={ref}
        className={dialogContainer({
          className,
          centered,
          displayNone,
        })}
      >
        {children}
      </div>
    );
  }
);
