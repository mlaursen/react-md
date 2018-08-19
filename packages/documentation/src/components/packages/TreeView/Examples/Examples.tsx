import * as React from "react";

import { default as ExamplesPage, ExampleList } from "components/ExamplesPage";

import SimpleExample from "./SimpleExample";

const examples: ExampleList = [
  {
    title: "Simple Example",
    children: <SimpleExample />,
  },
];

const Examples = () => <ExamplesPage title="TreeView" examples={examples} />;

export default Examples;
