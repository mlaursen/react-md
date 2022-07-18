import type { TypographyHTMLElement, TypographyProps } from "@react-md/core";
import { Typography } from "@react-md/core";
import { forwardRef } from "react";
import { cardSubtitle } from "./styles";

export type CardSubtitleProps = TypographyProps;

export const CardSubtitle = forwardRef<
  TypographyHTMLElement,
  CardSubtitleProps
>(function CardSubtitle(props, ref) {
  const {
    children,
    as = "h6",
    type = "subtitle-2",
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
      className={cardSubtitle({ className })}
    >
      {children}
    </Typography>
  );
});
