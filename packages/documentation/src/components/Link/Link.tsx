import * as React from "react";

import ExamplesPage from "components/ExamplesPage";

import SimpleLinks from "./SimpleLinks";
import LinkTarget from "./LinkTarget";

const examples = [{
  title: "Simple Links",
  children: <SimpleLinks />,
}, {
  title: "Link Target",
  children: <LinkTarget />,
}];

const Link: React.SFC<{}> = () => <ExamplesPage title="Link" examples={examples} />;

export default Link;
