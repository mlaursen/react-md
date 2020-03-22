import React, { FC } from "react";

import Heading from "components/Heading";

import styles from "./styles";

export interface SectionTitleProps {
  packageName: string;
  type: "Variables" | "Functions" | "Mixins";
}

const SectionTitle: FC<SectionTitleProps> = ({ packageName, type }) => (
  <Heading
    id={`${packageName}-${type.toLowerCase()}`}
    level={1}
    className={styles("section")}
  >
    {type}
  </Heading>
);

export default SectionTitle;
