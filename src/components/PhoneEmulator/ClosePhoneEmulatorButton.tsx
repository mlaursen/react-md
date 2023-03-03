import type { ButtonProps } from "@react-md/core";
import { Button } from "@react-md/core";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import KeyboardArrowLeftIcon from "@react-md/material-icons/KeyboardArrowLeftIcon";
import type { ReactElement } from "react";
import { usePhoneEmulator } from "./PhoneEmulatorProvider";

const noop = (): void => {
  // do nothing
};

export type ClosePhoneEmulatorButton = ButtonProps;

export function ClosePhoneEmulatorButton(
  props: ClosePhoneEmulatorButton
): ReactElement {
  const {
    "aria-label": ariaLabel = "Go back",
    children,
    onClick = noop,
    floating,
    ...remaining
  } = props;

  const { closePhone } = usePhoneEmulator();

  return (
    <Button
      {...remaining}
      aria-label={ariaLabel}
      onClick={(event) => {
        onClick(event);
        closePhone();
      }}
      buttonType="icon"
      floating={floating}
    >
      {children ?? (floating ? <CloseIcon /> : <KeyboardArrowLeftIcon />)}
    </Button>
  );
}
