import React, { ReactElement, ReactNode } from "react";

import Phone, { PhoneProps } from "./Phone";

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
