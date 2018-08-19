import * as React from "react";
import { DefaultTreeItemRenderer, TreeViewData, IDefaultTreeItemRendererProps } from "@react-md/tree-view";
import { MagicTooltip } from "@react-md/tooltip";

export interface ITreeItemState {
  tooltipped: boolean;
}

export default class TreeItem extends React.Component<IDefaultTreeItemRendererProps, ITreeItemState> {
  constructor(props: IDefaultTreeItemRendererProps) {
    super(props);

    this.state = { tooltipped: false };
  }

  public componentDidMount() {
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
    let query = "#navigation-tree";
    query = `${query} [aria-level="${depth + 1}"][aria-posinset="${itemIndex + 1}"]`;
    query = `${query} .rmd-list-item__text`;

    const node = document.querySelector(query) as HTMLElement;
    return !!node && node.scrollWidth > node.offsetWidth;
  };
}
