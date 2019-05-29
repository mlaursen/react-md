import React, { FC, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { WithForwardedRef } from "@react-md/utils";

export interface CaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {}

type WithRef = WithForwardedRef<HTMLTableCaptionElement>;

const Caption: FC<CaptionProps & WithRef> = ({
  className,
  forwardedRef,
  children,
  ...props
}) => (
  <caption
    {...props}
    ref={forwardedRef}
    className={cn("rmd-table-caption", className)}
  >
    {children}
  </caption>
);

export default forwardRef<HTMLTableCaptionElement, CaptionProps>(
  (props, ref) => <Caption {...props} forwardedRef={ref} />
);
