import BuildIcon from "@react-md/material-icons/BuildIcon";
import type { ReactElement } from "react";
import { StatusCode } from "src/utils/errors";

import { AsyncButton } from "../AsyncButton";
import { addAppToast } from "../Layout/AppToastRenderer";

export function RebuildIcons(): ReactElement {
  return (
    <AsyncButton
      floatingProps={{
        style: { transform: "translateX(-3.5rem)" },
      }}
      theme="warning"
      floating="bottom-right"
      onClick={async () => {
        const response = await fetch("/api/material/update", {
          method: "POST",
          body: JSON.stringify({}),
        });

        if (
          response.status === StatusCode.Accepted ||
          response.status === StatusCode.BadRequest
        ) {
          addAppToast({ toastId: "generating-icons" });
        }
      }}
    >
      <BuildIcon />
    </AsyncButton>
  );
}
