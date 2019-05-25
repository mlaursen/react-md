import React, { FC, ReactNode } from "react";
import cn from "classnames";

export interface CodeProps {
  className?: string;
  children: ReactNode;
  inline?: boolean;
}

const Code: FC<CodeProps> = ({ children, inline, className }) => (
  <code className={cn("code", { "code--inline": inline }, className)}>
    {children}
  </code>
);

Code.defaultProps = {
  inline: true,
};

export default Code;
