import React, { FunctionComponent } from "react";
import { Markdown } from "components/Markdown";

import readme from "./QuickStart.md";

export default () => <Markdown className="page-container">{readme}</Markdown>;
