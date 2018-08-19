import * as React from "react";

import { default as ExamplesPage, ExampleList } from "components/ExamplesPage";

import OverflowPortalExample from "./OverflowPortalExample";

const examples: ExampleList = [
  {
    title: "Overflow Portal Example",
    children: <OverflowPortalExample />,
    contentClassName: "examples-page__overflow-portal",
  },
];

const Examples = () => <ExamplesPage title="Portal" examples={examples} />;

export default Examples;
