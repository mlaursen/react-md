import React, { FC, useCallback } from "react";
import { AppBarNav, AppBarNavProps } from "@react-md/app-bar";
import {
  KeyboardArrowLeftSVGIcon,
  CloseSVGIcon,
} from "@react-md/material-icons";

import { usePhoneContext } from "./context";

import styles from "./ClosePhone.module.scss";

interface Props extends AppBarNavProps {
  floating?: boolean;
}

const ClosePhone: FC<Props> = ({
  children,
  onClick,
  floating,
  className,
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
    [onClick, closePhone]
  );

  const button = (
    <AppBarNav
      {...props}
      id={`${id}-close`}
      onClick={handleClick}
      theme={floating ? "secondary" : undefined}
      themeType={floating ? "contained" : undefined}
      className={className}
    >
      {floating ? <CloseSVGIcon /> : children}
    </AppBarNav>
  );
  if (!floating) {
    return button;
  }

  return <span className={styles.container}>{button}</span>;
};

ClosePhone.defaultProps = {
  "aria-label": "Go back",
  children: <KeyboardArrowLeftSVGIcon />,
  floating: false,
};

export default ClosePhone;
