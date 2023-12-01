// THIS FILE WAS GENERATED BY A SCRIPT AND SHOULD NOT BE UPDATED MANUALLY
import { type TableOfContentsItem } from "@/components/TableOfContents/types.js";

export const toc = [
  { id: "button", depth: 1, value: "Button" },
  {
    id: "simple-button",
    depth: 1,
    value: "Simple Button",
    items: [
      { id: "text-button", depth: 2, value: "Text Button" },
      { id: "outlined-button", depth: 2, value: "Outlined Button" },
      { id: "contained-button", depth: 2, value: "Contained Button" },
    ],
  },
  { id: "themed-button", depth: 1, value: "Themed Button" },
  {
    id: "icon-button",
    depth: 1,
    value: "Icon Button",
    items: [{ id: "icon-sizes", depth: 2, value: "Icon Sizes" }],
  },
  {
    id: "button-with-text-and-icon",
    depth: 1,
    value: "Button with Text and Icon",
    items: [{ id: "responsive-button", depth: 2, value: "Responsive Button" }],
  },
  { id: "floating-action-button", depth: 1, value: "Floating Action Button" },
  {
    id: "async-button",
    depth: 1,
    value: "Async Button",
    items: [
      { id: "manual-pending-state", depth: 2, value: "Manual Pending State" },
      {
        id: "loading-indicator-types",
        depth: 2,
        value: "Loading Indicator Types",
      },
      {
        id: "custom-loading-children",
        depth: 2,
        value: "Custom Loading Children",
      },
    ],
  },
] satisfies readonly TableOfContentsItem[];