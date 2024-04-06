import { link, Typography, type TypographyProps } from "react-md";
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
      case 4:
        type = `headline-${level + 2}` as "headline-2";
        break;
      default:
        type = "headline-6";
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
        className={link({ className: styles.link })}
      />
      {children}
    </Typography>
  );
}
