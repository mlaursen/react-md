"use client";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Typography,
  useCollapseTransition,
  useToggle,
} from "@react-md/core";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import styles from "./PartialCollapseExample.module.scss";

export default function PartialCollapseExample(): ReactElement {
  const { toggled, toggle } = useToggle();
  const { elementProps } = useCollapseTransition({
    transitionIn: toggled,
    // About 3 lines of content in the `CardContent` including vertical padding
    minHeight: "7rem",

    // the default `CardContent` vertical padding
    minPaddingTop: "1rem",
    minPaddingBottom: "1rem",
  });

  return (
    <Card>
      <CardContent {...elementProps}>
        <Typography className={cnb(!toggled && styles.overflow)}>
          Sed venenatis placerat pulvinar. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas. Sed sagittis
          urna diam, quis venenatis nibh congue sit amet. Suspendisse
          condimentum urna ac congue fringilla. Vivamus congue libero massa,
          tempor commodo purus pellentesque sed. Nam magna sapien, tincidunt in
          nunc a, convallis fringilla enim. Aenean at sagittis neque. Integer
          ornare mi consequat libero molestie luctus. Curabitur venenatis felis
          ut ipsum feugiat accumsan.
        </Typography>
        <Typography>
          Vivamus rhoncus efficitur ligula. Donec placerat tortor at vehicula
          bibendum. Duis sit amet cursus mauris. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos. Sed sit
          amet sagittis orci. Pellentesque habitant morbi tristique senectus et
          netus et malesuada fames ac turpis egestas. Aenean egestas erat ut
          quam consequat facilisis. Duis rhoncus libero at nisl suscipit, et
          tincidunt velit vestibulum. Mauris et pharetra tortor. Praesent ac
          mattis risus.
        </Typography>
      </CardContent>
      <CardFooter>
        {!toggled && <Button onClick={toggle}>Read more</Button>}
      </CardFooter>
    </Card>
  );
}
