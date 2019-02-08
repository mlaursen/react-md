import React, {
  FunctionComponent,
  Fragment,
  useState,
  useRef,
  ReactNode,
} from "react";
import cn from "classnames";

import "./styles.scss";
import Link from "../Link";
import { useIsKeyboardFocused } from "@react-md/wia-aria";

const SlideNavigator: FunctionComponent<{
  left: boolean;
  rendered: boolean;
  id: string;
  to: string;
  children: ReactNode;
}> = ({ rendered, left, ...props }) => {
  const isFocused = useIsKeyboardFocused(props.id);
  if (!rendered) {
    return null;
  }

  return (
    <Link
      {...props}
      className={cn("slide-navigator", {
        "slide-navigator--left": left,
        "slide-navigator--right": !left,
        "rmd-states--focused": isFocused,
      })}
    />
  );
};

export default SlideNavigator;
