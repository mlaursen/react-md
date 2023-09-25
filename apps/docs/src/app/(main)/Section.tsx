import { LinkableHeading } from "@/components/LinkableHeading.jsx";
import { TextContainer, Typography } from "@react-md/core";
import type { ReactElement, ReactNode } from "react";
import styles from "./Section.module.scss";

export interface SectionProps {
  heading: string;
  paragraph: ReactNode;
  children?: ReactNode;
}

export function Section(props: SectionProps): ReactElement {
  const { heading, paragraph, children } = props;
  return (
    <TextContainer className={styles.container}>
      <LinkableHeading
        id={heading.toLowerCase().replace(/\s+/g, "0")}
        level={3}
        className={styles.row}
      >
        {heading}
      </LinkableHeading>
      <Typography as="p" type="headline-6">
        {paragraph}
      </Typography>
      {children}
    </TextContainer>
  );
}
