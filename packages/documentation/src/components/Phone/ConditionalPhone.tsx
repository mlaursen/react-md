import React, { FC, ReactNode, Fragment } from "react";
import Phone, { PhoneProps } from "./Phone";

export interface ConditionalPhoneProps extends PhoneProps {
  enabled: boolean;
  children: ReactNode;
}

const ConditionalPhone: FC<ConditionalPhoneProps> = ({
  enabled,
  children,
  ...props
}) => {
  if (!enabled) {
    return <Fragment>{children}</Fragment>;
  }

  return <Phone {...props}>{children}</Phone>;
};

export default ConditionalPhone;
