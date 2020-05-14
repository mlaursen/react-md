import React, { FC } from "react";
import { MetadataType } from "constants/meta/types";
import { toTitle } from "utils/toTitle";

import styles from "./SearchType.module.scss";

export interface SearchTypeProps {
  type: MetadataType;
}

const SearchType: FC<SearchTypeProps> = ({ type }) => (
  <span className={styles.type}>{toTitle(type)}</span>
);

export default SearchType;
