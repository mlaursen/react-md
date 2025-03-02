import { FloatingActionButton } from "@react-md/core/button/FloatingActionButton";
import { button } from "@react-md/core/button/styles";
import { Typography } from "@react-md/core/typography/Typography";
import Link from "next/link.js";
import { type ReactElement } from "react";

import SimpleExample from "../SimpleExample.jsx";

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
