import React, { FunctionComponent, ReactNode } from "react";
import {
  AppBarAction as RMDAppBarAction,
  AppBarActionProps,
} from "@react-md/app-bar";
import { Tooltipped } from "@react-md/tooltip";

interface Props extends AppBarActionProps {
  id: string;
  tooltip?: ReactNode;
}

const AppBarAction: FunctionComponent<Props> = ({
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
}) => (
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
    <RMDAppBarAction {...props}>{children}</RMDAppBarAction>
  </Tooltipped>
);

export default AppBarAction;
