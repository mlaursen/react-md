import React, {
  FunctionComponent,
  useState,
  Fragment,
  useCallback,
  useEffect,
  useRef,
} from "react";
import cn from "classnames";
import { Text } from "@react-md/typography";

import Link from "components/Link";

import "./table-of-contents.scss";
import { useAppSizeContext } from "components/Layout/AppSize";
import { Button } from "@react-md/button";
import { ViewHeadlineSVGIcon } from "@react-md/material-icons";

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
  const { isLargeDesktop } = useAppSizeContext();
  const [hovering, setHovering] = useState(false);
  const enable = useCallback(() => {
    setHovering(true);
  }, []);
  const disable = useCallback(() => {
    setHovering(false);
  }, []);

  const handleIconKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (
      event.key === "Tab" &&
      event.shiftKey &&
      event.currentTarget === event.target
    ) {
      disable();
    }
  }, []);

  const handleAsideKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key !== "Tab" || event.shiftKey || !event.target) {
      return;
    }

    if (event.currentTarget.querySelector("li:last-child a") === event.target) {
      disable();
    }
  }, []);

  const visible = isLargeDesktop || hovering;

  useEffect(() => {
    // if the server wasn't able to guess the correct default size based on
    // the user-agent -- force update this component by triggering the two hover
    // changes
    window.requestAnimationFrame(() => {
      const query = `.table-of-contents.table-of-contents--${
        visible ? "visible" : "hidden"
      }`;

      if (!document.querySelector(query)) {
        setHovering(true);
        setHovering(() => false);
      }
    });
  }, []);

  return (
    <Fragment>
      <ViewHeadlineSVGIcon
        focusable="true"
        tabIndex={0}
        className="table-of-contents-toggle"
        onMouseEnter={enable}
        onFocus={enable}
        onKeyDown={handleIconKeyDown}
      />
      <aside
        id="table-of-contents"
        className={cn("table-of-contents", {
          "table-of-contents--hidden": !visible,
          "table-of-contents--visible": visible,
        })}
        onFocus={enable}
        onMouseLeave={disable}
        onKeyDown={handleAsideKeyDown}
      >
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
    </Fragment>
  );
};

export default TableOfContents;
