/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { FC, useCallback } from "react";

import Link from "components/Link";
import { TOCAnchor } from "constants/meta/types";

import styles from "./List.module.scss";

export interface ListProps {
  anchors: readonly TOCAnchor[];
  isLargeDesktop: boolean;
  onRequestClose: () => void;
}

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
    <ul onClick={handleClick} className={styles.list}>
      {anchors.map(({ anchor, title }) => (
        <li key={anchor} className={styles.item}>
          <Link href={anchor}>{title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default List;
