import { Button, Dialog, Typography } from "@react-md/core";
import LaunchIcon from "@react-md/material-icons/LaunchIcon";
import type { ReactElement, ReactNode } from "react";
import { usePhoneEnumator } from "./PhoneEmulatorProvider";

export interface ConditionalFullPageDialogProps {
  disabled: boolean;
  children: ReactNode;
}

export function ConditionalFullPageDialog(
  props: ConditionalFullPageDialogProps
): ReactElement {
  const { disabled, children } = props;
  const { showPhone, closePhone, isPhoneOpen } = usePhoneEnumator();
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <>
      <Typography type="headline-6">
        This example requires a more screen real estate than what is available
        so you will need to open it in a full page dialog.
      </Typography>
      <Button onClick={showPhone}>
        <LaunchIcon />
        Open
      </Button>
      <Dialog
        aria-label="Example"
        type="full-page"
        visible={isPhoneOpen}
        onRequestClose={closePhone}
      >
        {children}
      </Dialog>
    </>
  );
}
