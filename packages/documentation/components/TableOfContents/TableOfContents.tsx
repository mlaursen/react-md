import React, { FunctionComponent } from "react";
import { Portal } from "@react-md/portal";
import { Text } from "@react-md/typography";

import Link from "components/Link";

import "./table-of-contents.scss";

export interface Heading {
  id: string;
  title: string;
}

export interface TableOfContentsProps {
  headings: Heading[];
}

const TableOfContents: FunctionComponent<TableOfContentsProps> = ({
  headings,
}) => {
  return (
    <Portal visible>
      <aside id="table-of-contents" className="table-of-contents">
        <Text type="headline-6" className="table-of-contents__header">
          Table of Contents
        </Text>
        <ul>
          {headings.map(({ id, title }, i) => (
            <li key={i}>
              <Link href={`#${id}`} className="table-of-contents__link">
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </Portal>
  );
};

export default TableOfContents;
