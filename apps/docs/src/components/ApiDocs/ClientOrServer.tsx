import { Typography } from "@react-md/core";
import { type ReactElement } from "react";

export interface ClientOrServerProps {
  isClient: boolean;
}

export function ClientOrServer(props: ClientOrServerProps): ReactElement {
  const { isClient } = props;
  return (
    <>
      <Typography
        margin="none"
        type="headline-6"
        textColor={isClient ? "warning" : "success"}
      >
        {`${isClient ? "Client" : "Server"} Component`}
      </Typography>
      <Typography margin="none" type="subtitle-1">
        {`${
          isClient ? "Requires" : "Does not require"
        } client-side javascript.`}
      </Typography>
    </>
  );
}
