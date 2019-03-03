import React, { FunctionComponent, ReactNode } from "react";
import cn from "classnames";

export interface ICodeProps {
  className?: string;
  children: ReactNode;
  inline?: boolean;
}

const Code: FunctionComponent<ICodeProps> = ({
  children,
  inline,
  className,
}) => (
  <code className={cn("code", { "code--inline": inline }, className)}>
    {children}
  </code>
);

Code.defaultProps = {
  inline: true,
};

export default Code;
