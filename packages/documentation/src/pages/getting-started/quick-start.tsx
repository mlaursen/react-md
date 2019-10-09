import React, { ReactElement } from "react";
import { MarkdownPage } from "components/Markdown";

import readme from "./QuickStart.md";

export default (): ReactElement => <MarkdownPage>{readme}</MarkdownPage>;
