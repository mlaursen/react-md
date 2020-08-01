import React, { ReactElement } from "react";

import { MarkdownPage } from "components/Markdown";

import readme from "./OverridingDefaults.md";

export default function OverridingDefaults(): ReactElement {
  return <MarkdownPage>{readme}</MarkdownPage>;
}
