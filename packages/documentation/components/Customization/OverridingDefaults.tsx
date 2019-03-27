import React, { FunctionComponent } from "react";
import { MarkdownPage } from "components/Markdown";

import readme from "./OverridingDefaults.md";

export default () => <MarkdownPage>{readme}</MarkdownPage>;
