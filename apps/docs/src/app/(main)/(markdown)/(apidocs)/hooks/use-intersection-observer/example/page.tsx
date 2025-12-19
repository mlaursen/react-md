import { FloatingActionButton } from "@react-md/core/button/FloatingActionButton";
import { button } from "@react-md/core/button/styles";
import { Typography } from "@react-md/core/typography/Typography";
import { type Metadata } from "next";
import Link from "next/link.js";
import { type ReactElement } from "react";

import SimpleExample from "../SimpleExample.js";

export const metadata: Metadata = {
  title: `Use Intersection Observer Example - react-md`,
  description:
    "A simple example using the intersection observer to change colors of a box as the user scrolls.",
};

export default function ExamplePage(): ReactElement {
  return (
    <>
      <Typography type="headline-2" textAlign="center">
        Use Intersection Observer Example
      </Typography>
      <SimpleExample />
      <FloatingActionButton position="bottom-right">
        <Link
          href="/hooks/use-intersection-observer"
          className={button({ theme: "primary", themeType: "contained" })}
        >
          Back to Docs
        </Link>
      </FloatingActionButton>
    </>
  );
}
