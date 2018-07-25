// TODO: Make this a nice wrapper for rendering collapsable tree items
import * as React from "react";
import * as PropTypes from "prop-types";

export interface ITreeItem {
  "aria-expanded"?: "true";
  "aria-level": number;
  "aria-posinset": number;
  "aria-setsize": number;
  key: string;
  role: "treeitem";
  tabIndex?: 0 | -1;
  expanded: boolean;
  selected: boolean;
  onItemSelect: (itemId: string) => void;
  onItemExpandedChange: (itemId: string, expanded: boolean) => void;
  renderChildren?: () => React.ReactNode;
}

export interface ITreeItemProps extends ITreeItem {
  [key: string]: any;
}

export interface ITreeItemState {
  [key: string]: any;
}

export default class TreeItem extends React.Component<ITreeItemProps, ITreeItemState> {
  public static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props: ITreeItemProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return null;
  }
}
