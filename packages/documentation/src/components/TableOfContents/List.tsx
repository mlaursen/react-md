/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { FC, useCallback } from "react";
import { bem } from "@react-md/utils";

import Link from "components/Link";
import { TOCAnchor } from "constants/meta/types";

export interface ListProps {
  anchors: readonly TOCAnchor[];
  isLargeDesktop: boolean;
  onRequestClose: () => void;
}

const block = bem("table-of-contents");

const List: FC<ListProps> = ({ anchors, isLargeDesktop, onRequestClose }) => {
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
    <ul onClick={handleClick} className={block("list")}>
      {anchors.map(({ anchor, title }) => (
        <li key={anchor} className={block("item")}>
          <Link href={anchor} className={block("link")}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default List;
