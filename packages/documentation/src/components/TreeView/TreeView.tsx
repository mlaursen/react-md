import * as React from "react";

import ExamplesPage from "components/ExamplesPage";
import NavigationExample from "./NavigationExample";

const examples = [{
  title: "Navigation Example",
  children: <NavigationExample />,
}];

const TreeView: React.SFC<{}> = () => <ExamplesPage title="Tree View" examples={examples} />;

export default TreeView;
