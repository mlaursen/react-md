import React, { ReactElement, ReactNode } from "react";
import { AppBarNav as RMDAppBarNav, AppBarNavProps } from "@react-md/app-bar";
import { Tooltipped } from "@react-md/tooltip";

interface Props extends AppBarNavProps {
  id: string;
  tooltip?: ReactNode;
}

export default function AppBarNav({
  id,
  tooltip,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onFocus,
  onKeyDown,
  children,
  ...props
}: Props): ReactElement {
  return (
    <Tooltipped
      id={id}
      tooltip={tooltip}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
    >
      <RMDAppBarNav {...props}>{children}</RMDAppBarNav>
    </Tooltipped>
  );
}
