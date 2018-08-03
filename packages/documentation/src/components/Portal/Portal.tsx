import * as React from "react";

import ExamplesPage from "components/ExamplesPage";
import OverflowPortalExample from "./OverflowPortalExample";

const examples = [{
  title: "Overflow Portal Example",
  children: <OverflowPortalExample />,
  contentClassName: "examples-page__overflow-portal",
}];

const Portal: React.SFC<{}> = () => <ExamplesPage title="Portal" examples={examples} />;

export default Portal;
