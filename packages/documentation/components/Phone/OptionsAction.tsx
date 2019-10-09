import React, { FC } from "react";
import { AppBarAction, AppBarActionProps } from "@react-md/app-bar";
import { MoreVertSVGIcon } from "@react-md/material-icons";

import { usePhoneContext } from "./context";

const OptionsAction: FC<AppBarActionProps> = ({ children, ...props }) => {
  const { id } = usePhoneContext();
  return (
    <AppBarAction {...props} id={`${id}-options`}>
      {children}
    </AppBarAction>
  );
};

OptionsAction.defaultProps = {
  "aria-label": "Options",
  children: <MoreVertSVGIcon />,
  last: true,
};

export default OptionsAction;
