import * as React from "react";

import { default as ExamplesPage, ExampleList } from "components/ExamplesPage";

import SimpleSheets from "./SimpleSheets";

const examples: ExampleList = [
  {
    title: "Simple Sheets",
    children: <SimpleSheets />,
  },
];

const Examples = () => <ExamplesPage title="Sheet" examples={examples} />;

export default Examples;
