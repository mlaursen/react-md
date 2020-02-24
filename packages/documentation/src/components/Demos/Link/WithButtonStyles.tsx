import React, { FC } from "react";
import { cnb } from "cnbuilder";
import { ButtonThemeProps, buttonThemeClassNames } from "@react-md/button";
import { Link, LinkProps } from "@react-md/link";

import "./WithButtonStyles.scss";

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
      className: cnb("link-styled-button", className),
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
  <div className="link-button-styles">
    <LinkStyledButton href="https://react-md.dev">
      https://react-md.dev
    </LinkStyledButton>
  </div>
);

export default WithButtonStyles;
