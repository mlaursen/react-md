import * as React from "react";
import cn from "classnames";

import Markdown from "./Markdown";

export interface IMarkdownPageProps {
  style?: React.CSSProperties;
  className?: string;
  markdown: string;
}

const MarkdownPage: React.FunctionComponent<IMarkdownPageProps> = ({ className, ...props }) => (
  <Markdown {...props} className={cn("markdown-page rmd-text-container", className)} />
);

export default MarkdownPage;
