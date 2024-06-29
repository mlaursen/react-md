import cn from "classnames";
import type { ReactElement } from "react";
import type { ButtonThemeProps, LinkProps } from "react-md";
import { Link, button } from "react-md";

import styles from "./WithButtonStyles.module.scss";

function LinkStyledButton({
  className,
  theme,
  themeType,
  buttonType,
  disabled,
  children,
  ...props
}: ButtonThemeProps & LinkProps): ReactElement {
  return (
    (<Link
      {...props}
      className={button({
        disabled,
        theme,
        themeType,
        buttonType,
        className: cn(styles.link, className),
      })}
    >
      {children}
    </Link>)
  );
}

LinkStyledButton.defaultProps = {
  theme: "primary",
  themeType: "contained",
  buttonType: "text",
};

export default function WithButtonStyles(): ReactElement {
  return (
    <LinkStyledButton href="https://react-md.dev">
      https://react-md.dev
    </LinkStyledButton>
  );
}
