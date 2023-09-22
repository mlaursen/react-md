import { cnb } from "cnbuilder";
import { type HTMLAttributes, type ReactElement, type ReactNode } from "react";

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface DialogContainerProps extends HTMLAttributes<HTMLDivElement> {
  enabled: boolean;
  children: ReactNode;
}

/**
 * **Server Component**
 *
 * @remarks \@since 6.0.0
 * @internal
 */
export function DialogContainer(props: DialogContainerProps): ReactElement {
  const { className, enabled, children, ...remaining } = props;
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div {...remaining} className={cnb("rmd-dialog-container", className)}>
      {children}
    </div>
  );
}
