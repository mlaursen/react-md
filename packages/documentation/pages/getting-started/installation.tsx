import React, { ReactElement } from "react";
import { MarkdownPage } from "components/Markdown";

import readme from "./Installation.md";

export default (): ReactElement => <MarkdownPage>{readme}</MarkdownPage>;
