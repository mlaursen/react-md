"use client";

import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { Switch } from "@react-md/core/form/Switch";
import { objectFit } from "@react-md/core/objectFit";
import { useToggle } from "@react-md/core/useToggle";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";

import styles from "./GridAutoRowsExample.module.scss";

export default function GridAutoRowsExample(): ReactElement {
  const { toggled, toggle } = useToggle(true);
  return (
    <>
      <Switch label="Auto Rows" checked={toggled} onChange={toggle} />
      <Box
        align="stretch"
        grid
        gridColumns="fill"
        gridAutoRows={toggled}
        className={cnb(styles.container, toggled && styles.auto)}
      >
        {IMAGES.map((src) => (
          <Card key={src}>
            <CardContent>
              <img alt="" src={src} className={objectFit()} />
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
}

const IMAGES = [
  {
    id: "237",
    height: 300,
    width: 200,
  },
  {
    id: "232",
    height: 120,
    width: 340,
  },
  {
    id: "337",
    height: 100,
    width: 100,
  },
  {
    id: "137",
    height: 800,
    width: 800,
  },
  {
    id: "33",
    height: 300,
    width: 123,
  },
].map(
  ({ id, height, width }) => `https://picsum.photos/id/${id}/${width}/${height}`
);
