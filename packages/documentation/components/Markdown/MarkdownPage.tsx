import React, { FunctionComponent } from "react";
import cn from "classnames";
import { TextContainer } from "@react-md/typography";

import Markdown, { MarkdownProps } from "./Markdown";

export interface MarkdownPageProps extends MarkdownProps {
  containerClassName?: string;
}

const MarkdownPage: FunctionComponent<MarkdownPageProps> = ({
  containerClassName,
  children,
  ...props
}) => (
  <TextContainer className={cn("markdown-page", containerClassName)}>
    <Markdown {...props}>{children}</Markdown>
  </TextContainer>
);

export default MarkdownPage;
