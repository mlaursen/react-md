import React, { ReactElement, useCallback } from "react";
import { AppBarNav, AppBarNavProps } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import {
  KeyboardArrowLeftSVGIcon,
  CloseSVGIcon,
} from "@react-md/material-icons";

import { usePhoneContext } from "./context";

interface Props extends Omit<AppBarNavProps, "floating"> {
  floating?: boolean;
}

export default function ClosePhone({
  id,
  children,
  onClick,
  floating,
  ...props
}: Props): ReactElement {
  const { id: phoneId, closePhone } = usePhoneContext();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(event);
      }

      closePhone();
    },
    [onClick, closePhone]
  );

  const sharedProps = {
    ...props,
    id: id ?? `${phoneId ?? "demo"}-close`,
    onClick: handleClick,
    children: floating ? <CloseSVGIcon /> : children,
  };

  if (floating) {
    return <Button {...sharedProps} floating="bottom-right" />;
  }

  return <AppBarNav {...sharedProps} />;
}

ClosePhone.defaultProps = {
  "aria-label": "Go back",
  children: <KeyboardArrowLeftSVGIcon />,
  floating: false,
};
