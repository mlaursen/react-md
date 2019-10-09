import React, { ReactElement } from "react";
import { MarkdownPage } from "components/Markdown";

import readme from "./README.md";

export default (): ReactElement => <MarkdownPage>{readme}</MarkdownPage>;
