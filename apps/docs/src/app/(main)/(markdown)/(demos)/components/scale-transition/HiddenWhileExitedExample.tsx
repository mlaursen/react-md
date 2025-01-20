"use client";

import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { CardFooter } from "@react-md/core/card/CardFooter";
import { ScaleTransition } from "@react-md/core/transition/ScaleTransition";
import { Typography } from "@react-md/core/typography/Typography";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement, useState } from "react";

import styles from "./HiddenWhileExitedExample.module.scss";

export default function HiddenWhileExitedExample(): ReactElement {
  const { toggle, toggled } = useToggle();

  return (
    <Box stacked className={styles.container}>
      <Button onClick={toggle}>Toggle</Button>
      <ScaleTransition transitionIn={toggled} temporary={false}>
        <Card className={styles.element}>
          <Content />
        </Card>
      </ScaleTransition>
    </Box>
  );
}

function Content(): ReactElement {
  const [clicked, setClicked] = useState(0);

  return (
    <>
      <CardContent>
        <Typography>{`Clicked: ${clicked} times`}</Typography>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            setClicked((prev) => prev + 1);
          }}
          theme="primary"
          themeType="outline"
        >
          Click
        </Button>
      </CardFooter>
    </>
  );
}
