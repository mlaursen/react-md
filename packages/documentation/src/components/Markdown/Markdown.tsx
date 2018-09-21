import * as React from "react";
import cn from "classnames";
import { withRouter, RouteComponentProps } from "react-router";

import { markdownToHTML } from "utils/markdown";

import "./markdown.scss";

export interface IMarkdownProps extends RouteComponentProps<any> {
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

class Markdown extends React.Component<IMarkdownProps, IMarkdownState> {
  public static getDerivedStateFromProps(nextProps: IMarkdownProps, prevState: IMarkdownState) {
    const { markdown } = nextProps;
    if (prevState.prevMarkdown !== markdown) {
      return {
        html: { __html: markdownToHTML(nextProps.markdown) },
        prevMarkdown: markdown,
      };
    }

    return null;
  }

  private container: React.RefObject<HTMLDivElement>;
  constructor(props: IMarkdownProps) {
    super(props);

    this.state = {
      html: { __html: markdownToHTML(props.markdown) },
      prevMarkdown: props.markdown,
    };

    this.container = React.createRef();
  }

  public componentDidMount() {
    this.updateLinks();
  }

  public componentDidUpdate(prevProps: IMarkdownProps, prevState: IMarkdownState) {
    if (this.state.html !== prevState.html) {
      this.updateLinks();
    }
  }

  public render() {
    const { style, className, markdown } = this.props;
    const { html } = this.state;
    if (!html.__html || !markdown) {
      return null;
    }

    return (
      <div
        ref={this.container}
        style={style}
        className={cn("markdown-container", className)}
        dangerouslySetInnerHTML={html}
      />
    );
  }

  private updateLinks = () => {
    const { history } = this.props;
    if (!this.container.current) {
      return;
    }

    const links = Array.from(this.container.current.querySelectorAll(".rmd-link") as NodeListOf<
      HTMLAnchorElement
    >);
    for (const link of links) {
      if (/^https?:\/\/(localhost|react-md|mlaursen\.github\.io\/react-md\/)/.test(link.href)) {
        // update internal links to use browser history instead of native behavior
        link.onclick = function handleClick(event: MouseEvent) {
          event.preventDefault();
          history.push(link.href.replace(window.location.origin, ""));
        };
      }
    }
  };
}

export default withRouter(Markdown);
