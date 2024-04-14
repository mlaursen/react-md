"use client";
import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { List } from "@react-md/core/list/List";
import { ListItem } from "@react-md/core/list/ListItem";
import { CSSTransition } from "@react-md/core/transition/CSSTransition";
import { useState, type ReactElement } from "react";
import styles from "./AppearTransitionExample.module.scss";

export default function AppearTransitionExample(): ReactElement {
  const [count, setCount] = useState(0);
  return (
    <Box stacked disablePadding>
      <Button
        onClick={() =>
          setCount((prevCount) => {
            // just so it doesn't render too many
            if (prevCount === 9) {
              return 0;
            }

            return prevCount + 1;
          })
        }
      >
        Add
      </Button>
      <List>
        {Array.from({ length: count }, (_, i) => (
          <CSSTransition
            key={i}
            appear
            timeout={150}
            classNames={{
              enter: styles.enter,
              enterActive: styles.enterActive,
            }}
            transitionIn
          >
            <ListItem primaryText={`Item ${i + 1}`} />
          </CSSTransition>
        ))}
      </List>
    </Box>
  );
}
