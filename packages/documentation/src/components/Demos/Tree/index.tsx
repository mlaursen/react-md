import React, { ReactElement } from "react";
import { IconProvider } from "@react-md/icon";

import DemoPage from "../DemoPage";
import README from "./README.md";

import SingleSelectTree from "./SingleSelectTree";
import singleSelectTree from "./SingleSelectTree.md";

import MultiSelectTree from "./MultiSelectTree";
import multiSelectTree from "./MultiSelectTree.md";

import CustomizingTreeItems from "./CustomizingTreeItems";
import customizingTreeItems from "./CustomizingTreeItems.md";

const demos = [
  {
    name: "Single Select Tree",
    description: singleSelectTree,
    children: <SingleSelectTree />,
  },
  {
    name: "Multi Select Tree",
    description: multiSelectTree,
    children: <MultiSelectTree />,
  },
  {
    name: "Customizing Tree Items",
    description: customizingTreeItems,
    children: <CustomizingTreeItems />,
  },
];

// demos will be wrapped with the IconProvider just in-case people inspect the DOM
// to view the generated HTML. I want the demos to reflect the default behavior
// instead of the documentation overrides for SVG icons
export default (): ReactElement => (
  <IconProvider>
    <DemoPage
      demos={demos}
      description={README}
      packageName="tree"
      fonts={["Font Awesome", "Material Icons"]}
    />
  </IconProvider>
);
