import * as React from "react";
import cn from "classnames";
import { Collapse } from "@react-md/transition";
import { StatesConsumer } from "@react-md/states";

import { markdownToHTML } from "utils/markdown";
import { Markdown } from "components/Markdown";

interface IInnerHTML {
  __html: string;
}

export interface IExpandableSourceProps {
  code: string;
  linkId: string;
}

export interface IExpandableSourceState {
  html: IInnerHTML;
  collapsed: boolean;
  oneLineCode: string;
}

export default class ExpandableSource extends React.Component<
  IExpandableSourceProps,
  IExpandableSourceState
> {
  private sourceEl: React.RefObject<HTMLDivElement>;
  constructor(props: IExpandableSourceProps) {
    super(props);

    const oneLineCode = this.toOneLineCode(props.code);
    this.state = {
      html: this.createHtml(oneLineCode),
      collapsed: true,
      oneLineCode,
    };
    this.sourceEl = React.createRef();
  }

  public render() {
    const { collapsed, html, oneLineCode } = this.state;
    const { code } = this.props;
    const expandable = oneLineCode !== code;

    return (
      <StatesConsumer disabled={!expandable} onKeyDown={this.handleKeyDown}>
        {({ disabled, className, ...statesProps }) => {
          return (
            <div
              {...statesProps}
              ref={this.sourceEl}
              className={cn("sassdoc__source markdown-container", className)}
              aria-expanded={expandable ? !collapsed : undefined}
              tabIndex={expandable ? 0 : undefined}
              role={expandable ? "button" : undefined}
              onClick={expandable ? this.handleClick : undefined}
            >
              <Collapse
                collapsed={collapsed}
                minHeight="3.5rem"
                minPaddingTop="1rem"
                minPaddingBottom="1rem"
                onCollapsed={this.handleCollapseEnd}
              >
                {({ style, className: collapseClassName, refCallback }) => (
                  <pre
                    ref={refCallback}
                    style={style}
                    className={cn("sassdoc__source-code", collapseClassName)}
                    dangerouslySetInnerHTML={html}
                  />
                )}
              </Collapse>
            </div>
          );
        }}
      </StatesConsumer>
    );
  }

  private toOneLineCode(code: string) {
    if (!/\r?\n/.test(code)) {
      return code;
    }

    if (/@(mixin|function)/.test(code)) {
      return (
        code.substring(0, code.indexOf("{") + 1) +
        " \u2026 " +
        code.substring(code.lastIndexOf("}"))
      );
    }

    return `\`\`\`scss
${code
      .substring(8, code.length - 4)
      .replace(/\r?\n\s*/g, " ")
      .replace(/\(\s+/, "(")
      .replace(/\s+\)/g, ")")}
\`\`\``;
  }

  private createHtml(code: string) {
    return {
      __html: markdownToHTML(code).replace(/<\/?pre>/g, ""),
    };
  }

  private handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (this.state.collapsed) {
      this.setState({ html: this.createHtml(this.props.code) }, () => {
        window.requestAnimationFrame(() => {
          this.setState({ collapsed: false });
        });
      });
    } else {
      this.setState({ collapsed: true });
    }
  };

  private handleCollapseEnd = () => {
    const { current } = this.sourceEl;
    if (current) {
      const { offsetHeight } = document.getElementById("main-header") as HTMLElement;
      const { top } = current.getBoundingClientRect();
      if (top < offsetHeight * 0.25) {
        const link = document.getElementById(this.props.linkId) as HTMLAnchorElement;
        window.scrollTo(0, link.offsetTop - offsetHeight);
      }
    }

    this.setState({ html: this.createHtml(this.state.oneLineCode) });
  };

  private handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === " " || event.key === "Enter") {
      if (event.key === " ") {
        event.preventDefault();
      }

      event.currentTarget.click();
    }
  };
}
