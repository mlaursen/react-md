"use client";
import { Box, Button, List, ListItem } from "react-md";
import { useState, type ReactElement } from "react";
import styles from "./CSSOnlyAppearTransitionExample.module.scss";

export default function CSSOnlyAppearTransitionExample(): ReactElement {
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
          <ListItem
            key={i}
            className={styles.item}
            primaryText={`Item ${i + 1}`}
          />
        ))}
      </List>
    </Box>
  );
}
