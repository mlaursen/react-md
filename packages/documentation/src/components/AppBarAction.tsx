import { ReactElement, ReactNode } from "react";
import {
  AppBarAction as RMDAppBarAction,
  AppBarActionProps,
} from "@react-md/app-bar";
import { Tooltipped } from "@react-md/tooltip";

interface Props extends AppBarActionProps {
  id: string;
  tooltip?: ReactNode;
}

export default function AppBarAction({
  id,
  tooltip,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
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
      onFocus={onFocus}
      onKeyDown={onKeyDown}
    >
      <RMDAppBarAction {...props}>{children}</RMDAppBarAction>
    </Tooltipped>
  );
}
