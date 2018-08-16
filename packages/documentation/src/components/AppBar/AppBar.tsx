import * as React from "react";

import ExamplesPage from "components/ExamplesPage";

import SingleLineAppBars from "./SingleLineAppBars";
import ProminentAppBars from "./ProminentAppBars";
import DenseAppBars from "./DenseAppBars";

const examples = [{
  title: "Single Line App Bars",
  children: <SingleLineAppBars />,
  exampleGroup: false,
}, {
  title: "Prominent App Bars",
  children: <ProminentAppBars />,
  exampleGroup: false,
}, {
  title: "Dense App Bars",
  children: <DenseAppBars />,
  exampleGroup: false,
}];

const AppBar = () => <ExamplesPage title="App Bar" examples={examples} />;

export default AppBar;
