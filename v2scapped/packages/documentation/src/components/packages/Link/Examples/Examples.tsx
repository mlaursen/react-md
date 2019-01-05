import * as React from "react";

import { default as ExamplesPage, ExampleList } from "components/ExamplesPage";

import SimpleLinks from "./SimpleLinks";
import LinkTarget from "./LinkTarget";

const examples: ExampleList = [
  {
    title: "Simple Links",
    children: <SimpleLinks />,
  },
  {
    title: "Link Target",
    children: <LinkTarget />,
  },
];

const Examples = () => <ExamplesPage title="Link" examples={examples} />;

export default Examples;
