import type { ReactElement, ReactNode } from "react";

import type { PhoneProps } from "./Phone";
import Phone from "./Phone";

export interface ConditionalPhoneProps extends PhoneProps {
  enabled: boolean;
  children: ReactNode;
}

export default function ConditionalPhone({
  enabled,
  children,
  ...props
}: ConditionalPhoneProps): ReactElement {
  if (!enabled) {
    return <>{children}</>;
  }

  return <Phone {...props}>{children}</Phone>;
}
