import * as React from "react";

import { default as ExamplesPage, ExampleList } from "components/ExamplesPage";

import AllTextTypes from "./AllTextTypes";

const examples: ExampleList = [
  {
    title: "All Text Types",
    children: <AllTextTypes />,
    exampleGroup: false,
  },
];

const Examples = () => <ExamplesPage title="Typography" examples={examples} />;

export default Examples;
