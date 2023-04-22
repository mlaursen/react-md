import type { TypographyProps } from "@react-md/core";
import { Typography } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { ReactElement, ReactNode } from "react";
import { UnstyledLink } from "./UnstyledLink";

import styles from "./LinkableHeading.module.scss";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface LinkableHeadingProps extends Omit<TypographyProps, "type"> {
  id: string;
  level: HeadingLevel;
  children: ReactNode;
}

export function LinkableHeading(props: LinkableHeadingProps): ReactElement {
  const { id, level, className, children, ...remaining } = props;

  return (
    <Typography
      {...remaining}
      id={id}
      type={`headline-${level}`}
      className={cnb(styles.container, className)}
    >
      <UnstyledLink href={`#${id}`} className={styles.link}>
        {children}
      </UnstyledLink>
    </Typography>
  );
}
