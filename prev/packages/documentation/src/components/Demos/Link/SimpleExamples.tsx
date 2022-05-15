import type { ReactElement } from "react";
import { Link } from "@react-md/link";
import { Typography } from "@react-md/typography";

import Code from "components/Code";

export default function SimpleExamples(): ReactElement {
  return (
    <>
      <ul>
        <li>
          <Link href="https://github.com">Github</Link>
        </li>
        <li>
          <Link href="https://w3.org">www.w3.org</Link>
        </li>
      </ul>
      <Typography>
        You can also render links within paragraphs or the{" "}
        <Code>{"<Typography />"}</Code>
        component. So here is a link to{" "}
        <Link href="https://github.com">GitHub</Link> again to show how it
        looks.
      </Typography>
    </>
  );
}
