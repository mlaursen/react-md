import React, { FunctionComponent } from "react";
import cn from "classnames";
import { TextContainer } from "@react-md/typography";
import useCrossFade from "hooks/useCrossFade";

import Markdown, { MarkdownProps } from "./Markdown";

export interface MarkdownPageProps extends MarkdownProps {
  containerClassName?: string;
}

const MarkdownPage: FunctionComponent<MarkdownPageProps> = ({
  containerClassName,
  children,
  ...props
}) => (
  <TextContainer
    className={cn("markdown-page", useCrossFade(containerClassName))}
  >
    <Markdown {...props}>{children}</Markdown>
  </TextContainer>
);

export default MarkdownPage;
