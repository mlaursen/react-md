import * as React from "react";

import ExamplesPage from "../ExamplesPage";

import "./styles.css";
import FlatButtons from "./FlatButtons";
import OutlinedButtons from "./OutlinedButtons";
import ContainedButtons from "./ContainedButtons";
import IconButtons from "./IconButtons";

const examples = [{
  title: "Flat Buttons",
  contentClassName: "example-group temp-btn-focus",
  children: <FlatButtons />,
}, {
  title: "Outlined Buttons",
  contentClassName: "example-group temp-btn-focus",
  children: <OutlinedButtons />,
}, {
  title: "Contained Buttons",
  contentClassName: "example-group temp-btn-focus",
  children: <ContainedButtons />,
}, {
  title: "Icon Buttons",
  contentClassName: "example-group temp-btn-focus",
  children: <IconButtons />,
}];

const Buttons: React.SFC<{}> = () => <ExamplesPage examples={examples} title="Buttons" />;

export default Buttons;
