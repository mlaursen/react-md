import React, { FC } from "react";
import { Link } from "@react-md/link";
import { Text } from "@react-md/typography";

import Code from "components/Code/Code";

const SimpleExamples: FC = () => (
  <>
    <ul>
      <li>
        <Link href="https://github.com">Github</Link>
      </li>
      <li>
        <Link href="https://w3.org">www.w3.org</Link>
      </li>
    </ul>
    <Text>
      You can also render links within paragraphs or the{" "}
      <Code>{"<Text />"}</Code>
      component. So here is a link to{" "}
      <Link href="https://github.com">GitHub</Link> again to show how it looks.
    </Text>
  </>
);

export default SimpleExamples;
