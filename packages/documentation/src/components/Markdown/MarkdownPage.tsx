import * as React from "react";
import cn from "classnames";

import Markdown from "./Markdown";

export interface IMarkdownPageProps {
  style?: React.CSSProperties;
  className?: string;
  markdown: string;
}

const MarkdownPage: React.SFC<IMarkdownPageProps> = ({ className, ...props }) => (
  <Markdown {...props} className={cn("markdown-page rmd-text-container rmd-text-container--large", className)} />
);

export default MarkdownPage;
