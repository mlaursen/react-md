import React, { FunctionComponent } from "react";
import { MarkdownPage } from "components/Markdown";

import readme from "./Installation.md";

export default () => <MarkdownPage>{readme}</MarkdownPage>;
