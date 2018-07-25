import * as React from "react";

import ExamplesPage from "../ExamplesPage";

import FlatButtons from "./FlatButtons";
import OutlinedButtons from "./OutlinedButtons";
import ContainedButtons from "./ContainedButtons";
import IconButtons from "./IconButtons";

const examples = [{
  title: "Flat Buttons",
  children: <FlatButtons />,
}, {
  title: "Outlined Buttons",
  children: <OutlinedButtons />,
}, {
  title: "Contained Buttons",
  children: <ContainedButtons />,
}, {
  title: "Icon Buttons",
  children: <IconButtons />,
}];

const Buttons: React.SFC<{}> = () => <ExamplesPage examples={examples} title="Buttons" />;

export default Buttons;
