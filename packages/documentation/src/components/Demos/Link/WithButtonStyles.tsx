import React, { FC } from "react";
import cn from "classnames";
import { ButtonThemeProps, buttonThemeClassNames } from "@react-md/button";
import { Link, LinkProps } from "@react-md/link";

import styles from "./WithButtonStyles.module.scss";

const LinkStyledButton: FC<ButtonThemeProps & LinkProps> = ({
  className,
  theme,
  themeType,
  buttonType,
  disabled,
  children,
  ...props
}) => (
  <Link
    {...props}
    className={buttonThemeClassNames({
      disabled,
      theme,
      themeType,
      buttonType,
      className: cn(styles.link, className),
    })}
  >
    {children}
  </Link>
);

LinkStyledButton.defaultProps = {
  theme: "primary",
  themeType: "contained",
  buttonType: "text",
};

const WithButtonStyles: FC = () => (
  <LinkStyledButton href="https://react-md.dev">
    https://react-md.dev
  </LinkStyledButton>
);

export default WithButtonStyles;
