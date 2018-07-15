import * as React from "react";

import ExamplesPage from "../../ExamplesPage";

import "./styles.css";
import SimpleExample from "./SimpleExample";

const examples = [{
  title: "Resizing ",
  children: <SimpleExample />,
}];

const ResizeObservers: React.SFC<{}> = () => <ExamplesPage examples={examples} title="ResizeObservers" />;

export default ResizeObservers;
