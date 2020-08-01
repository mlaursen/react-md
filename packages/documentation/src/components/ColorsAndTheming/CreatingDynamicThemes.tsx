import React, { ReactElement } from "react";

import { MarkdownPage } from "components/Markdown";

import readme from "./CreatingDynamicThemes.md";

export default function CreatingDynamicThemes(): ReactElement {
  return <MarkdownPage>{readme}</MarkdownPage>;
}
