import { cnb } from "cnbuilder";
import type { HTMLAttributes, ReactElement, ReactNode } from "react";

export interface DialogContainerProps extends HTMLAttributes<HTMLDivElement> {
  enabled: boolean;
  children: ReactNode;
}

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
