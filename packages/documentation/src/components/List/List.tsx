import * as React from "react";

import ExamplesPage from "components/ExamplesPage";
import TextOnly from "./TextOnly";

const examples = [{
  title: "Text Only",
  children: <TextOnly />,
}];

const List: React.SFC<{}> = () => <ExamplesPage title="List" examples={examples} />;

export default List;
