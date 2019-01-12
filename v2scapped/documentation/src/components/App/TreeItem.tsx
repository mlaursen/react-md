import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  DefaultTreeItemRenderer,
  TreeViewData,
  IDefaultTreeItemRendererProps,
} from "@react-md/tree-view";
import { Tooltip } from "@react-md/tooltip";

export interface ITreeItemState {
  tooltipped: boolean;
}

export default class TreeItem extends React.Component<
  IDefaultTreeItemRendererProps,
  ITreeItemState
> {
  private item: HTMLElement | null;
  private timeout?: number;
  constructor(props: IDefaultTreeItemRendererProps) {
    super(props);

    this.item = null;
    this.state = { tooltipped: false };
  }

  public componentDidMount() {
    this.item = ReactDOM.findDOMNode(this) as HTMLElement;
    this.scrollIntoView();
    this.updateTooltip();
  }

  public componentDidUpdate() {
    this.updateTooltip();
  }

  public componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  public render() {
    const { tooltipped } = this.state;
    const { children, itemId, ...props } = this.props;

    let tooltip;
    let tooltipId;
    if (tooltipped) {
      tooltipId = itemId.substring(1).replace(/\//g, "-");
      tooltip = (
        <Tooltip id={tooltipId} portal>
          {children}
        </Tooltip>
      );
    }

    return (
      <DefaultTreeItemRenderer {...props} aria-describedby={tooltipId}>
        {children}
        {tooltip}
      </DefaultTreeItemRenderer>
    );
  }

  private checkTooltip = ({ depth, itemIndex }: IDefaultTreeItemRendererProps) => {
    window.clearTimeout(this.timeout);

    return new Promise<boolean>(resolve => {
      this.timeout = window.setTimeout(() => {
        this.timeout = undefined;
        if (!this.item) {
          resolve(false);
          return;
        }

        const node = this.item.querySelector(".rmd-list-item__text") as HTMLElement;
        resolve(!!node && node.scrollWidth > node.offsetWidth);
      }, 300);
    });
  };

  private updateTooltip = async () => {
    const tooltipped = await this.checkTooltip(this.props);
    if (this.state.tooltipped !== tooltipped) {
      this.setState({ tooltipped });
    }
  };

  private scrollIntoView = () => {
    if (!this.item || !this.props.selected) {
      return;
    }

    window.requestAnimationFrame(() => {
      const navigation = document.getElementById("navigation") as HTMLElement;
      const header = navigation && (navigation.querySelector("header") as HTMLElement);
      if (navigation && this.item && header) {
        navigation.scrollTop = this.item.offsetTop - header.offsetHeight;
      }
    });
  };
}
