import * as React from "react";

import { default as ExamplesPage, ExampleList } from "components/ExamplesPage";

import RelativeTooltips from "./RelativeTooltips";
import MagicTooltips from "./MagicTooltips";
import FixingOverflowIssues from "./FixingOverflowIssues";

const examples: ExampleList = [
  {
    title: "Relative Tooltips",
    children: <RelativeTooltips />,
  },
  {
    title: "Magic Tooltips rendering within viewport",
    description: `
The \`MagicTooltip\` component is used to help solve three main problems:
- "automagically" determining the best position on the page to render the tooltip so it will always
be rendered within the viewport.
- needing to display a tooltip without requiring \`position: relative\` on its container element
- needing to display a tooltip when a parent node has overflow set which _might_ cause the tooltip
to not appear if it is near the edges of the parent node.
  `,
    children: <MagicTooltips />,
  },
  {
    title: "Magic Tooltips fixing overflow issues",
    children: <FixingOverflowIssues />,
  },
  {
    title: "Magic Tooltips hover mode",
    description: `
Another feature of the \`MagicTooltip\` is that it will enable a "hover mode" by default. Since tooltips
normally require hovering \`0.5s\` before being visible, this delay will have to be repeated for each
different tooltip the user attempts to view. The "hover mode" feature will remove this required delay
once a tooltip has become visible until the user no longer is hovering over a tooltip area for \`1s\`.
    `,
    children: null,
  },
];

const Examples = () => <ExamplesPage title="Tooltip" examples={examples} />;

export default Examples;
