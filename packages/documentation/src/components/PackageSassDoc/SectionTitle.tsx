import { ReactElement } from "react";

import Heading from "components/Heading";

import styles from "./PackageSassDoc.module.scss";

export interface SectionTitleProps {
  packageName: string;
  type: "Variables" | "Functions" | "Mixins";
}

export default function SectionTitle({
  packageName,
  type,
}: SectionTitleProps): ReactElement {
  return (
    <Heading
      id={`${packageName}-${type.toLowerCase()}`}
      level={1}
      className={styles.title}
    >
      {type}
    </Heading>
  );
}
