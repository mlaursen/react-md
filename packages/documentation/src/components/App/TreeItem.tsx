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

    const tooltipped = this.checkTooltip(this.props);
    if (this.state.tooltipped !== tooltipped) {
      this.setState({ tooltipped });
    }
  }

  public componentDidUpdate(prevProps: IDefaultTreeItemRendererProps, prevState: ITreeItemState) {
    const tooltipped = this.checkTooltip(this.props);
    if (this.state.tooltipped !== tooltipped) {
      this.setState({ tooltipped });
    }
  }

  public render() {
    const { tooltipped } = this.state;
    const { children, ...props } = this.props;

    let tooltip;
    let tooltipId;
    if (tooltipped) {
      let { depth, itemIndex } = props;
      depth += 1;
      itemIndex += 1;
      tooltipId = `navigation-item-${depth}-${itemIndex}-tooltip`;
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

  private scrollIntoView = () => {
    if (!this.item || !this.props.selected) {
      return;
    }

    window.requestAnimationFrame(() => {
      const navigation = document.getElementById("navigation") as HTMLElement;
      const header = navigation && navigation.querySelector("header") as HTMLElement;
      if (navigation && this.item && header) {
        navigation.scrollTop = this.item.offsetTop - header.offsetHeight;
      }
    });
  };
}
