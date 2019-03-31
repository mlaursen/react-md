import React, { FunctionComponent } from "react";
import { AppBarNav, AppBarNavProps } from "@react-md/app-bar";
import { KeyboardArrowLeftSVGIcon } from "@react-md/material-icons";

import { usePhoneContext } from "./context";

const ClosePhone: FunctionComponent<AppBarNavProps> = ({
  children,
  ...props
}) => {
  const { id } = usePhoneContext();
  return (
    <AppBarNav {...props} id={`${id}-close`}>
      {children}
    </AppBarNav>
  );
};

ClosePhone.defaultProps = {
  "aria-label": "Go back",
  children: <KeyboardArrowLeftSVGIcon />,
};

export default ClosePhone;
