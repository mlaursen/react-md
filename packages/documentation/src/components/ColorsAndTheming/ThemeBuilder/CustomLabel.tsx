import type { ReactElement, ReactNode } from "react";

export interface CustomLabelProps {
  isDefault: boolean;
  children: ReactNode;
}

export default function CustomLabel({
  children,
  isDefault,
}: CustomLabelProps): ReactElement {
  if (!isDefault) {
    return <>{children}</>;
  }

  return (
    <>
      {children}{" "}
      <small>
        <i>(site default)</i>
      </small>
    </>
  );
}
