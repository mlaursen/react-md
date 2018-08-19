import * as React from "react";

import { default as ExamplesPage, ExampleList } from "components/ExamplesPage";
import TextOnly from "./TextOnly";

const examples: ExampleList = [
  {
    title: "Text Only",
    children: <TextOnly />,
  },
];

const Examples = () => <ExamplesPage title="List" examples={examples} />;

export default Examples;
