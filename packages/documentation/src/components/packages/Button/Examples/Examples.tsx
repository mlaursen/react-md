import * as React from "react";

import { default as ExamplesPage, ExampleList } from "components/ExamplesPage";

import FlatButtons from "./FlatButtons";
import OutlinedButtons from "./OutlinedButtons";
import ContainedButtons from "./ContainedButtons";
import IconButtons from "./IconButtons";

const examples: ExampleList = [
  {
    title: "Flat Buttons",
    children: <FlatButtons />,
  },
  {
    title: "Outlined Buttons",
    children: <OutlinedButtons />,
  },
  {
    title: "Contained Buttons",
    children: <ContainedButtons />,
  },
  {
    title: "Icon Buttons",
    children: <IconButtons />,
  },
];

const description = `The \`@react-md/button\` package is used to create buttons
with the material design spec. There is also built-in support for rendering clickable
divs as buttons as well as applying button styles to any component.
`;

const Examples = () => <ExamplesPage title="Button" examples={examples} description={description} />;

export default Examples;
