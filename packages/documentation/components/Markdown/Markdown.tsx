import React, {
  FunctionComponent,
  useState,
  useEffect,
  useMemo,
  HTMLAttributes,
  Fragment,
} from "react";
import cn from "classnames";
import Head from "next/head";

import "./markdown.scss";
import { markdownToHTML } from "./utils";

function useMarkdownResolver(markdown: IMarkdownProps["children"]) {
  if (typeof markdown === "string") {
    return markdown;
  }

  const [resolved, setResolved] = useState("");
  useEffect(() => {
    markdown().then(md => {
      if (typeof md === "string") {
        setResolved(md);
      } else if (typeof md.default === "string") {
        setResolved(md.default);
      }
    });
  }, [markdown]);

  return resolved;
}

function useHTML(children: MarkdownChildren) {
  const markdown = useMarkdownResolver(children);
  const html = useMemo(
    () => ({
      __html: markdownToHTML(markdown),
    }),
    [markdown]
  );

  return html;
}

export type ResolveMarkdown = () => Promise<string | { default: string }>;
export type MarkdownChildren = string | ResolveMarkdown;

export interface IMarkdownProps extends HTMLAttributes<HTMLDivElement> {
  children?: ResolveMarkdown | string;
}

const Markdown: FunctionComponent<IMarkdownProps> = ({
  className,
  children,
  ...props
}) => {
  const html = useHTML(children);
  return (
    <Fragment>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Source+Code+Pro"
          rel="stylesheet"
        />
      </Head>
      <div
        {...props}
        className={cn("markdown-container", className)}
        dangerouslySetInnerHTML={html}
      />
    </Fragment>
  );
};

export default Markdown;
