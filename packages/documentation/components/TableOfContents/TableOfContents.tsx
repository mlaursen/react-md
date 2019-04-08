import React, {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import cn from "classnames";
import { Button } from "@react-md/button";
import { ViewHeadlineSVGIcon } from "@react-md/material-icons";
import { useAppSizeContext } from "@react-md/sizing";
import { Text } from "@react-md/typography";
import { useToggle } from "@react-md/utils";

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
  const { isLargeDesktop } = useAppSizeContext();
  const { toggled: hovering, disable, enable, toggle } = useToggle();

  const handleIconKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key !== "Tab" || event.currentTarget !== event.target) {
      return;
    }
    if (event.type === "keyup" && !event.shiftKey) {
      enable();
    } else if (event.type === "keydown" && event.shiftKey) {
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
        enable();
        disable();
      }
    });
  }, []);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  // useEventListener("click", event => {
  //   const button = buttonRef.current;
  //   const table = tableRef.current;
  //   const target = event.target as HTMLElement | null;
  //   if (
  //     !target ||
  //     !button ||
  //     !table ||
  //     !(button.contains(target) || table.contains(target))
  //   ) {
  //     hide();
  //   }
  // });

  return (
    <Fragment>
      <Button
        id="table-of-contents-toggle"
        theme="clear"
        buttonType="icon"
        className="table-of-contents-toggle"
        onMouseEnter={enable}
        onClick={toggle}
        onKeyUp={handleIconKeyPress}
        onKeyDown={handleIconKeyPress}
        ref={buttonRef}
        aria-labelledby="table-of-contents-title"
      >
        <ViewHeadlineSVGIcon />
      </Button>
      <aside
        id="table-of-contents"
        ref={tableRef}
        className={cn("table-of-contents", {
          "table-of-contents--hidden": !visible,
          "table-of-contents--visible": visible,
        })}
        onFocus={enable}
        onMouseLeave={disable}
        onKeyDown={handleAsideKeyDown}
      >
        <Text
          id="table-of-contents-title"
          type="headline-6"
          className="table-of-contents__header"
        >
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
