import React, { FunctionComponent, useCallback } from "react";
import { bem } from "@react-md/theme";

import Link from "components/Link";
import { Heading } from "./usePageHeadings";

export interface ListProps {
  headings: Heading[];
  isLargeDesktop: boolean;
  onRequestClose: () => void;
}

const block = bem("table-of-contents");

const List: FunctionComponent<ListProps> = ({
  headings,
  isLargeDesktop,
  onRequestClose,
}) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLUListElement>) => {
      if (
        !isLargeDesktop &&
        event.target &&
        event.target !== event.currentTarget
      ) {
        onRequestClose();
      }
    },
    [onRequestClose, isLargeDesktop]
  );

  return (
    <ul className={block("list")} onClick={handleClick}>
      {headings.map(({ id, title }, i) => (
        <li key={i} className={block("item")}>
          <Link href={`#${id}`} className={block("link")}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default List;
