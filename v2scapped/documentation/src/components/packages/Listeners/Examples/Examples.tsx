import * as React from "react";

import { default as ExamplesPage, ExampleList } from "components/ExamplesPage";

import ResizeListenerUsingOnResize from "./ResizeListenerUsingOnResize";
import ResizeListenerUsingChildrenCallback from "./ResizeListenerUsingChildrenCallback";

const examples: ExampleList = [
  {
    title: "ResizeListener using onResize",
    children: <ResizeListenerUsingOnResize />,
  },
  {
    title: "ResizeListener using children callback function",
    children: <ResizeListenerUsingChildrenCallback />,
  },
];

const Examples = () => <ExamplesPage title="Listeners" examples={examples} />;

export default Examples;
