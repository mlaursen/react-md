import React, { FC } from "react";

import Heading from "components/Heading";

import styles from "./PackageSassDoc.module.scss";

export interface SectionTitleProps {
  packageName: string;
  type: "Variables" | "Functions" | "Mixins";
}

const SectionTitle: FC<SectionTitleProps> = ({ packageName, type }) => (
  <Heading
    id={`${packageName}-${type.toLowerCase()}`}
    level={1}
    className={styles.title}
  >
    {type}
  </Heading>
);

export default SectionTitle;
