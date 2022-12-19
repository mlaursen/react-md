import { Snackbar, Toast } from "@react-md/alert";
import type { ReactElement } from "react";

export function SimpleExample(): ReactElement {
  return (
    <Snackbar>
      <Toast visible>This is an example message</Toast>
    </Snackbar>
  );
}
