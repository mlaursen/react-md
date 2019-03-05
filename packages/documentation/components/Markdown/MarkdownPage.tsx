import React, { FunctionComponent } from "react";
import cn from "classnames";
import { TextContainer } from "@react-md/typography";

import Markdown, { IMarkdownProps } from "./Markdown";

export interface IMarkdownPageProps extends IMarkdownProps {
  containerClassName?: string;
}

const MarkdownPage: FunctionComponent<IMarkdownPageProps> = ({
  containerClassName,
  children,
  ...props
}) => (
  <TextContainer className={cn("markdown-page", containerClassName)}>
    <Markdown {...props}>{children}</Markdown>
  </TextContainer>
);

export default MarkdownPage;
