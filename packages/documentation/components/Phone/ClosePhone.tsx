import React, { FunctionComponent, useCallback } from "react";
import { AppBarNav, AppBarNavProps } from "@react-md/app-bar";
import { KeyboardArrowLeftSVGIcon } from "@react-md/material-icons";

import { usePhoneContext } from "./context";

const ClosePhone: FunctionComponent<AppBarNavProps> = ({
  children,
  onClick,
  ...props
}) => {
  const { id, closePhone } = usePhoneContext();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(event);
      }

      closePhone();
    },
    [onClick]
  );

  return (
    <AppBarNav {...props} id={`${id}-close`} onClick={handleClick}>
      {children}
    </AppBarNav>
  );
};

ClosePhone.defaultProps = {
  "aria-label": "Go back",
  children: <KeyboardArrowLeftSVGIcon />,
};

export default ClosePhone;
