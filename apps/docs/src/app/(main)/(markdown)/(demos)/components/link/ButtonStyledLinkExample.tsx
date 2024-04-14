import { button } from "@react-md/core/button/buttonStyles";
import { cssUtils } from "@react-md/core/cssUtils";
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
