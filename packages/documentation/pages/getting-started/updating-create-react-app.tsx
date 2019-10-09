import React, { ReactElement } from "react";
import { MarkdownPage } from "components/Markdown";

import readme from "./UpdatingCreateReactApp.md";

export default (): ReactElement => <MarkdownPage>{readme}</MarkdownPage>;
