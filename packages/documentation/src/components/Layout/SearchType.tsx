import React, { FC } from "react";
import { RouteMetadata } from "constants/meta/types";
import { toTitle } from "utils/toTitle";

export interface SearchTypeProps {
  type: RouteMetadata["type"] | "info";
}

const SearchType: FC<SearchTypeProps> = ({ type }) => (
  <span className="layout__search-type">{toTitle(type)}</span>
);

export default SearchType;
