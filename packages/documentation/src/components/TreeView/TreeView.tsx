import * as React from "react";

import ExamplesPage from "components/ExamplesPage";
import SortableExample from "./SortableExample";

const examples = [{
  title: "Sortable Example",
  children: <SortableExample />,
}];

const TreeView: React.SFC<{}> = () => <ExamplesPage title="Tree View" examples={examples} />;

export default TreeView;
