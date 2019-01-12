import * as React from "react";
import cn from "classnames";

import Link from "components/Link";

import "./anchor.scss";

export interface IAnchorProps {
  id: string;
  title?: string;
  className?: string;
  after?: boolean;
}

export interface IAnchorDefaultProps {
  after: boolean;
}

export type AnchorWithDefaultProps = IAnchorProps & IAnchorDefaultProps;

export default class Anchor extends React.Component<IAnchorProps> {
  public static readonly anchorTargetClassName = "anchor-target";
  public static defaultProps: IAnchorDefaultProps = {
    after: false,
  };

  private keyboardClicked: boolean = false;

  public render() {
    const { id, className, after } = this.props as AnchorWithDefaultProps;
    let { title } = this.props;
    if (title) {
      title = `Quick shareable link to ${title}`;
    }

    return (
      <Link
        to={`#${id}`}
        title={title}
        className={cn("anchor", { "anchor--before": !after, "anchor--after": after }, className)}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
      >
        #
      </Link>
    );
  }

  private copyLinkToClipboard = () => {
    const area = document.createElement("textarea") as HTMLTextAreaElement;
    area.value = `${window.location.origin}${window.location.pathname}#${this.props.id}`;
    document.body.appendChild(area);
    area.select();

    try {
      document.execCommand("copy");
    } catch (e) {
      //
    } finally {
      document.body.removeChild(area);
    }
  };

  private handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    this.copyLinkToClipboard();

    if (this.keyboardClicked) {
      this.keyboardClicked = false;
      return;
    }

    event.currentTarget.blur();
  };

  private handleKeyDown = () => {
    this.keyboardClicked = true;
  };
}
