import React, { FC } from "react";
import { MetadataType } from "constants/meta/types";
import { toTitle } from "utils/toTitle";

export interface SearchTypeProps {
  type: MetadataType;
}

const SearchType: FC<SearchTypeProps> = ({ type }) => (
  <span className="layout__search-type">{toTitle(type)}</span>
);

export default SearchType;
