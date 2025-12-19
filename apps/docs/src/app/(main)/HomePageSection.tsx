import { TextContainer } from "@react-md/core/typography/TextContainer";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement, type ReactNode } from "react";

import { LinkableHeading } from "@/components/LinkableHeading.js";
import { slug } from "@/utils/slug.js";

import styles from "./HomePageSection.module.scss";

export interface HomePageSectionProps {
  heading: string;
  paragraph: ReactNode;
  children?: ReactNode;
}

export function HomePageSection(props: HomePageSectionProps): ReactElement {
  const { heading, paragraph, children } = props;
  return (
    <TextContainer className={styles.container}>
      <LinkableHeading id={slug(heading)} level={3} className={styles.row}>
        {heading}
      </LinkableHeading>
      <Typography as="p" type="headline-6">
        {paragraph}
      </Typography>
      {children}
    </TextContainer>
  );
}
