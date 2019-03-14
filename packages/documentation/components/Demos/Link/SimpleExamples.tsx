import React, { FunctionComponent, Fragment } from "react";
import { Link } from "@react-md/link";
import { TextIconSpacing } from "@react-md/icon";
import { Text } from "@react-md/typography";

import GithubSVGIcon from "icons/GithubSVGIcon";
import Code from "components/Code/Code";

const SimpleExamples: FunctionComponent = () => (
  <Fragment>
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
  </Fragment>
);

export default SimpleExamples;
