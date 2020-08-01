import React, { ReactElement } from "react";

import { MarkdownPage } from "components/Markdown";

import readme from "./README.md";

export default function About(): ReactElement {
  return <MarkdownPage>{readme}</MarkdownPage>;
}
