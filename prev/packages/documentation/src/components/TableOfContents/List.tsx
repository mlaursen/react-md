/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
import type { ReactElement } from "react";
import { useCallback } from "react";
import { Link } from "@react-md/link";

import type { TOCAnchor } from "constants/meta/types";

import styles from "./List.module.scss";

export interface ListProps {
  anchors: readonly TOCAnchor[];
  isLargeDesktop: boolean;
  onRequestClose: () => void;
}

export default function List({
  anchors,
  isLargeDesktop,
  onRequestClose,
}: ListProps): ReactElement {
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
}
