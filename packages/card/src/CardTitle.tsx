import type { TypographyHTMLElement, TypographyProps } from "@react-md/core";
import { Typography } from "@react-md/core";
import { forwardRef } from "react";
import { cardTitle } from "./styles";

export type CardTitleProps = TypographyProps;

export const CardTitle = forwardRef<TypographyHTMLElement, CardTitleProps>(
  function CardTitle(props, ref) {
    const {
      children,
      as = "h5",
      type = "headline-5",
      margin = "none",
      className,
      ...remaining
    } = props;

    return (
      <Typography
        {...remaining}
        ref={ref}
        as={as}
        type={type}
        margin={margin}
        className={cardTitle({ className })}
      >
        {children}
      </Typography>
    );
  }
);
