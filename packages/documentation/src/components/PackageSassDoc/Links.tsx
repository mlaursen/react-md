import * as React from "react";
import { Link } from "@react-md/link";

import { ILink } from "types/sassdoc";

import SassDocTitle from "./SassDocTitle";

export interface ILinksProps {
  links: ILink[];
}

const Links: React.SFC<ILinksProps> = ({ links }) => {
  if (!links.length) {
    return null;
  }

  return (
    <React.Fragment>
      <SassDocTitle>Links</SassDocTitle>
      <ul className="sassdoc__list">
        {links.map(({ url, caption }, key) => (
          <li key={key}>
            <Link href={url}>{caption || url}</Link>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Links;
