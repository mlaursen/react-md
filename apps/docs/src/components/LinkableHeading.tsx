import { Typography, type TypographyProps } from "@react-md/core";
import { cnb } from "cnbuilder";
import { type ReactElement, type ReactNode } from "react";
import { LinkUnstyled } from "./LinkUnstyled.js";
import styles from "./LinkableHeading.module.scss";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface LinkableHeadingProps extends TypographyProps {
  id: string;
  level: HeadingLevel;
  children: ReactNode;
}

export function LinkableHeading(props: LinkableHeadingProps): ReactElement {
  const {
    id,
    level,
    type: propType,
    className,
    children,
    ...remaining
  } = props;
  let type = propType;
  if (!type) {
    switch (level) {
      case 1:
      case 2:
      case 3:
        type = `headline-${level + 2}` as "headline-2";
        break;
      case 4:
        type = "subtitle-1";
        break;
      default:
        type = "subtitle-2";
    }
  }

  return (
    <Typography
      {...remaining}
      id={id}
      type={type}
      className={cnb(styles.container, className)}
    >
      <LinkUnstyled
        aria-label="Permalink"
        href={`#${id}`}
        className={styles.link}
      />
      {children}
    </Typography>
  );
}
