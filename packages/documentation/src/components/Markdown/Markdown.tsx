import * as React from "react";
import cn from "classnames";

import { markdownToHTML } from "utils/markdown";

import "./markdown.scss";

export interface IMarkdownProps {
  style?: React.CSSProperties;
  className?: string;
  markdown: string;
}

interface IInnerHTML {
  __html: string;
}

export interface IMarkdownState {
  html: IInnerHTML;
  prevMarkdown: string;
}

export default class Markdown extends React.Component<IMarkdownProps, IMarkdownState> {
  public static getDerivedStateFromProps(nextProps: IMarkdownProps, prevState: IMarkdownState) {
    const { markdown } = nextProps;
    if (prevState.prevMarkdown !== markdown) {
      return {
        html: { __html: markdownToHTML(nextProps.markdown) },
        prevMarkdown: markdown,
      }
    }

    return null;
  };

  constructor(props: IMarkdownProps) {
    super(props);

    this.state = {
      html: { __html: markdownToHTML(props.markdown) },
      prevMarkdown: props.markdown,
    };
  }

  public render() {
    const { style, className, markdown } = this.props;
    const { html } = this.state;
    if (!html.__html || !markdown) {
      return null;
    }

    return <div style={style} className={cn("markdown-container", className)} dangerouslySetInnerHTML={html} />;
  }

  private updateInnerHTML = () => {
    const { markdown } = this.props;
    if (!markdown) {
      return;
    }

    const html = markdownToHTML(markdown);
    if (this.state.html.__html !== html) {
      this.setState({ html: { __html: html } });
    }
  };
}
