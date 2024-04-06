"use client";
import { Box, Button, CSSTransition, List, ListItem } from "react-md";
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
