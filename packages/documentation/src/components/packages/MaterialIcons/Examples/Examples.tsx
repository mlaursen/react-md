import * as React from "react";

import { default as ExamplesPage, ExampleList } from "components/ExamplesPage";

import AllIcons from "./AllIcons";

const examples: ExampleList = [{
  title: "All Icons",
  children: <AllIcons />,
  contentClassName: "material-icons__list"
}];

const Examples = () => <ExamplesPage title="MaterialIcons" examples={examples} />;

export default Examples;
