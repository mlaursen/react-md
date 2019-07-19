/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, react/no-array-index-key */
import React, { FC, useCallback } from "react";
import { bem } from "@react-md/theme";

import Link from "components/Link";
import { Heading } from "./usePageHeadings";

export interface ListProps {
  headings: Heading[];
  isLargeDesktop: boolean;
  onRequestClose: () => void;
}

const block = bem("table-of-contents");

const List: FC<ListProps> = ({ headings, isLargeDesktop, onRequestClose }) => {
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

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const target = event.target as HTMLAnchorElement;
      const { hash } = window.location;
      if (!target || event.key !== "Tab" || event.shiftKey || !hash) {
        return;
      }

      const links = Array.from(event.currentTarget.querySelectorAll("a"));
      const [lastLink] = links.reverse();
      const toFocus = document.querySelector<HTMLElement>(`${hash}-link`);
      if (target === lastLink && toFocus) {
        event.preventDefault();
        toFocus.focus();
      }
    },
    []
  );

  return (
    <ul
      className={block("list")}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
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
