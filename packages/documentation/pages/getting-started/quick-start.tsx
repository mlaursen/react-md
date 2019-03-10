import React, { FunctionComponent } from "react";
import { MarkdownPage } from "components/Markdown";

import readme from "./QuickStart.md";

export default () => <MarkdownPage>{readme}</MarkdownPage>;
