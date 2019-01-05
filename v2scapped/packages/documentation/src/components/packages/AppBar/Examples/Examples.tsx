import * as React from "react";

import { default as ExamplesPage, ExampleList } from "components/ExamplesPage";

import SingleLineAppBars from "./SingleLineAppBars";
import ProminentAppBars from "./ProminentAppBars";
import DenseAppBars from "./DenseAppBars";

const examples: ExampleList = [
  {
    title: "Single Line App Bars",
    children: <SingleLineAppBars />,
    exampleGroup: false,
  },
  {
    title: "Prominent App Bars",
    children: <ProminentAppBars />,
    exampleGroup: false,
  },
  {
    title: "Dense App Bars",
    children: <DenseAppBars />,
    exampleGroup: false,
  },
];

const Examples = () => <ExamplesPage title="AppBar" examples={examples} />;

export default Examples;
