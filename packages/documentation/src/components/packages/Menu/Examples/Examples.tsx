import * as React from "react";

import { default as ExamplesPage, ExampleList } from "components/ExamplesPage";
import SimpleExamples from "./SimpleExamples";

const examples: ExampleList = [
  {
    title: "Simple Examples",
    children: <SimpleExamples />,
  },
];

const Examples = () => <ExamplesPage title="Menu" examples={examples} />;

export default Examples;
