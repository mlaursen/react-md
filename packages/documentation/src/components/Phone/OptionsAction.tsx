import React, { ReactElement } from "react";
import { AppBarAction, AppBarActionProps } from "@react-md/app-bar";
import { MoreVertSVGIcon } from "@react-md/material-icons";

import { usePhoneContext } from "./context";

export default function OptionsAction({
  children,
  ...props
}: AppBarActionProps): ReactElement {
  const { id } = usePhoneContext();
  return (
    <AppBarAction {...props} id={`${id}-options`}>
      {children}
    </AppBarAction>
  );
}

OptionsAction.defaultProps = {
  "aria-label": "Options",
  children: <MoreVertSVGIcon />,
  last: true,
};
