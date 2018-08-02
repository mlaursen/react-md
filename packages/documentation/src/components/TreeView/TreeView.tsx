import * as React from "react";

import ExamplesPage from "components/ExamplesPage";
import SimpleExample from "./SimpleExample";
// import SortableExample from "./SortableExample";

const examples = [{
  title: "Simple Example",
  children: <SimpleExample />,
}];

const TreeView: React.SFC<{}> = () => <ExamplesPage title="Tree View" examples={examples} />;

export default TreeView;
