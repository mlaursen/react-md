import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@react-md/link";

import { ISassDocLinkTo } from "types/sassdoc";
import SassDocTitle from "./SassDocTitle";

export interface IReferenceListProps {
  includeDescription?: boolean;
  children: React.ReactNode;
  list?: ISassDocLinkTo[];
}

const ReferenceList: React.SFC<IReferenceListProps> = ({ children, list, includeDescription }) => {
  if (!list || !list.length) {
    return null;
  }

  return (
    <React.Fragment>
      <SassDocTitle>{children}</SassDocTitle>
      <ul className="sassdoc__list">
        {list.map(({ name, type, description, group }, key) => (
          <li key={key}>
            {`${type} - `}
            <Link
              to={`${process.env.PUBLIC_URL}/packages/${group}/sassdoc#${type.toLowerCase()}-${name}`}
              component={RouterLink}
            >
              {name}
            </Link>
            {includeDescription && description && ` - ${description}`}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

ReferenceList.defaultProps = {
  includeDescription: false,
};

export default ReferenceList;
