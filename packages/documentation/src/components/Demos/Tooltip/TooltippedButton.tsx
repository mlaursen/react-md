import { ReactElement } from "react";
import { ButtonProps, Button } from "@react-md/button";
import { Tooltipped, TooltippedProps } from "@react-md/tooltip";

interface TooltippedButtonProps
  extends ButtonProps,
    Pick<TooltippedProps, "tooltip" | "defaultPosition" | "dense"> {
  id: string;
}

export default function TooltippedButton({
  id,
  tooltip,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onFocus,
  onKeyDown,
  children,
  dense,
  defaultPosition,
  ...props
}: TooltippedButtonProps): ReactElement {
  return (
    <Tooltipped
      id={id}
      tooltip={tooltip}
      dense={dense}
      defaultPosition={defaultPosition}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
    >
      <Button {...props}>{children}</Button>
    </Tooltipped>
  );
}

TooltippedButton.defaultProps = {
  themeType: "outline",
};
