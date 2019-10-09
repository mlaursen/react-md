import React, { FC, forwardRef, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import { WithForwardedRef } from "@react-md/utils";

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children: ReactNode;
  inline?: boolean;
}

const Code: FC<CodeProps & WithForwardedRef<HTMLElement>> = ({
  children,
  inline,
  className,
  forwardedRef,
  ...props
}) => (
  <code
    {...props}
    ref={forwardedRef}
    className={cn("code", { "code--inline": inline }, className)}
  >
    {children}
  </code>
);

Code.defaultProps = {
  inline: true,
};

export default forwardRef<HTMLElement, CodeProps>((props, ref) => (
  <Code {...props} forwardedRef={ref} />
));
