import * as React from "react";

import ExamplesPage from "components/ExamplesPage";

import SimpleSheets from "./SimpleSheets";

const examples = [{
  title: "Simple Sheets",
  children: <SimpleSheets />,
}];

const Sheet = () => <ExamplesPage title="Sheets" examples={examples} />;

export default Sheet;
