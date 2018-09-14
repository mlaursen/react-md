import * as React from "react";
import * as ReactDOM from "react-dom";
import { DefaultTreeItemRenderer, TreeViewData, IDefaultTreeItemRendererProps } from "@react-md/tree-view";
import { MagicTooltip } from "@react-md/tooltip";

export interface ITreeItemState {
  tooltipped: boolean;
}

export default class TreeItem extends React.Component<IDefaultTreeItemRendererProps, ITreeItemState> {
  private item: HTMLElement | null;
  constructor(props: IDefaultTreeItemRendererProps) {
    super(props);

    this.item = null;
    this.state = { tooltipped: false };
  }

  public componentDidMount() {
    this.item = ReactDOM.findDOMNode(this) as HTMLElement;
    this.scrollIntoView();

    if (document.readyState !== "complete") {
      document.addEventListener("load", this.updateTooltip);
    } else {
      this.updateTooltip();
    }
  }

  public render() {
    const { tooltipped } = this.state;
    const { children, itemId, ...props } = this.props;

    let tooltip;
    let tooltipId;
    if (tooltipped) {
      tooltipId = itemId.substring(1).replace(/\//g, "-");
      tooltip = <MagicTooltip id={tooltipId}>{children}</MagicTooltip>;
    }

    return (
      <DefaultTreeItemRenderer {...props} aria-describedby={tooltipId}>
        {children}
        {tooltip}
      </DefaultTreeItemRenderer>
    );
  }

  private checkTooltip = ({ depth, itemIndex }: IDefaultTreeItemRendererProps) => {
    if (!this.item) {
      return false;
    }

    const node = this.item.querySelector(".rmd-list-item__text") as HTMLElement;
    return !!node && node.scrollWidth > node.offsetWidth;
  };

  private updateTooltip = () => {
    const tooltipped = this.checkTooltip(this.props);
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
