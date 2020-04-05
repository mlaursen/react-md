import React, { CSSProperties, FC, useCallback, useRef, useState } from "react";
import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { List, ListItem } from "@react-md/list";
import { ArrowDropDownSVGIcon } from "@react-md/material-icons";
import { Overlay } from "@react-md/overlay";
import { Text } from "@react-md/typography";
import { getFixedPosition, ScrollListener, useToggle } from "@react-md/utils";

import "./SimpleExample.scss";

const SimpleExample: FC = () => {
  const [visible, , hide, toggle] = useToggle(false);
  const [style, setStyle] = useState<CSSProperties | undefined>();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const updatePosition = useCallback(() => {
    setStyle(
      getFixedPosition({
        container: buttonRef.current,
        element: listRef.current,
      }).style
    );
  }, []);
  const listRefCB = useCallback((list: HTMLUListElement | null) => {
    listRef.current = list;

    updatePosition();
    // only want to call this once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="portal-container">
      <Button
        id="portal-button"
        theme="secondary"
        themeType="outline"
        aria-haspopup="true"
        aria-expanded={visible}
        onClick={toggle}
        ref={buttonRef}
      >
        <TextIconSpacing icon={<ArrowDropDownSVGIcon />} iconAfter>
          Options...
        </TextIconSpacing>
      </Button>
      <Overlay
        id="portal-menu-overlay"
        className="portal-menu-overlay"
        visible={visible}
        onRequestClose={hide}
      >
        <List
          role="menu"
          id="portal-menu"
          aria-labelledby="portal-button"
          tabIndex={-1}
          ref={listRefCB}
          style={style}
          className="portal-menu"
          onClick={(event) => {
            if (event.currentTarget !== event.target) {
              hide();
            }
          }}
        >
          <ScrollListener onScroll={updatePosition} />
          {Array.from(new Array(6)).map((_, i) => (
            <ListItem id={`menu-item-${i}`} key={i} role="menuitem">
              {`Option ${i + 1}`}
            </ListItem>
          ))}
        </List>
      </Overlay>
      <Text>
        In condimentum ultrices metus ut viverra. In faucibus erat eu massa
        tincidunt finibus. Donec eget quam venenatis, venenatis arcu sed, mollis
        tellus. Mauris massa nunc, condimentum quis nisi vel, fermentum
        pellentesque est. Pellentesque varius rhoncus dui. Donec suscipit
        gravida justo eu pharetra. Donec suscipit neque a orci bibendum, a
        consectetur ipsum finibus. Aenean est ligula, aliquet ut nunc vitae,
        volutpat pharetra tortor. Cras ipsum mi, posuere eu diam a, cursus
        euismod mi. Ut vitae eros nibh.
      </Text>
    </div>
  );
};

export default SimpleExample;
