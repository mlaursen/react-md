import { button, cssUtils } from "react-md";
import { type ReactElement } from "react";

export default function ButtonStyledLinkExample(): ReactElement {
  return (
    <a
      href="https://react-md.dev"
      className={button({
        className: cssUtils({
          textDecoration: "none",
        }),
        theme: "primary",
        themeType: "outline",
      })}
    >
      Link
    </a>
  );
}
