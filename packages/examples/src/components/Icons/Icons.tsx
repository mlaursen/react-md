import * as React from "react";

import ExamplesPage from "../ExamplesPage";

import FontIcons from "./FontIcons";
import SVGIcons from "./SVGIcons";
import MaterialIcons from "./MaterialIcons";

const examples = [{
  title: "FontIcons",
  contentClassName: "example-group",
  children: <FontIcons />,
}, {
  title: "SVGIcons",
  contentClassName: "example-group",
  children: <SVGIcons />,
}, {
  title: "Using @react-md/material-icons",
  contentClassName: "example-group",
  children: <MaterialIcons />,
}];

const Buttons: React.SFC<{}> = () => <ExamplesPage examples={examples} title="Icons" />;

export default Buttons;
