import React, { ReactElement } from "react";

import { MarkdownPage } from "components/Markdown";

import readme from "./OverridingDefaults.md";

export default (): ReactElement => <MarkdownPage>{readme}</MarkdownPage>;
