import React from "react";
import { MarkdownPage } from "components/Markdown";

import "./WithV1.scss";
import readme from "./WithV1.md";

export default () => <MarkdownPage className="with-v1">{readme}</MarkdownPage>;
