import React, { FC } from "react";
import { cnb } from "cnbuilder";
import { TextContainer } from "@react-md/typography";

import Markdown, { MarkdownProps } from "./Markdown";

export interface MarkdownPageProps extends MarkdownProps {
  containerClassName?: string;
}

const MarkdownPage: FC<MarkdownPageProps> = ({
  containerClassName,
  children,
  ...props
}) => (
  <TextContainer className={cnb("markdown-page", containerClassName)}>
    <Markdown {...props}>{children}</Markdown>
  </TextContainer>
);

export default MarkdownPage;
