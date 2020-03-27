import React, { ReactElement } from "react";

import { MarkdownPage } from "components/Markdown";

import readme from "./CreatingDynamicThemes.md";

export default (): ReactElement => <MarkdownPage>{readme}</MarkdownPage>;
