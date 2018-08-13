import * as React from "react";

import ExamplesPage from "components/ExamplesPage";

import SimpleAppBars from "./SimpleAppBars";

const examples = [{
  title: "Simple",
  children: <SimpleAppBars />,
}];

const AppBar = () => <ExamplesPage title="App Bar" examples={examples} />;

export default AppBar;
