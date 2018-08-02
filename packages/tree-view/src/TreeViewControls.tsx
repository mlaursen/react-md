import * as React from "react";
import * as PropTypes from "prop-types";
import { ITreeViewBaseProps } from "./TreeView";

import {
  onItemSelect,
  onItemExpandedChange,
  onItemSiblingExpansion,
} from "./types";

export interface ITreeViewControls<D, R> extends ITreeViewBaseProps<D, R> {
  onItemSelect: onItemSelect;
  onItemExpandedChange: onItemExpandedChange;
  onItemSiblingExpansion: onItemSiblingExpansion;
  selectedIds: string[];
  expandedIds: string[];
}

export interface ITreeViewControlsProps<D, R> extends ITreeViewBaseProps<D, R> {
  defaultSelectedIds?: string[];
  defaultExpandedIds?: string[];
  children: (controls: ITreeViewControls<D, R>) => React.ReactNode;
}

export interface ITreeViewControlsDefaultProps {
  defaultSelectedIds: string[];
  defaultExpandedIds: string[];
}

export type TreeViewControlsWithDefaultProps<D, R> = ITreeViewControlsProps<D, R> & ITreeViewControlsDefaultProps;

export interface ITreeViewControlsState {
  selectedIds: string[];
  expandedIds: string[];
}

export default class TreeViewControls<D, R> extends React.Component<
  ITreeViewControlsProps<D, R>,
  ITreeViewControlsState
> {
  public static propTypes = {
    className: PropTypes.string,
    defaultSelectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    defaultExpandedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  public static defaultProps: ITreeViewControlsDefaultProps = {
    defaultSelectedIds: [],
    defaultExpandedIds: [],
  };

  constructor(props: ITreeViewControlsProps<D, R>) {
    super(props);
    const { data, defaultExpandedIds, defaultSelectedIds } = props as TreeViewControlsWithDefaultProps<D, R>;

    let selectedIds = defaultSelectedIds;
    if (!selectedIds.length && data[0] && data[0].itemId) {
      selectedIds = [data[0].itemId];
    }

    this.state = {
      selectedIds,
      expandedIds: defaultExpandedIds,
    };
  }

  public render() {
    const { selectedIds, expandedIds } = this.state;
    const {
      defaultSelectedIds,
      defaultExpandedIds,
      onItemSelect,
      onItemExpandedChange,
      onItemSiblingExpansion,
      children,
      ...props
    } = this.props;

    return children({
      ...props,
      selectedIds,
      expandedIds,
      onItemSelect: this.handleItemSelect,
      onItemExpandedChange: this.handleItemExpandedChange,
      onItemSiblingExpansion: this.handleItemSiblingExpansion,
    });
  }

  private handleItemSelect = (itemId: string) => {
    this.setState({ selectedIds: [itemId] });
  };

  private handleItemExpandedChange = (itemId: string, expanded: boolean) => {
    const i = this.state.expandedIds.indexOf(itemId);
    if (i === -1 && expanded) {
      const expandedIds = this.state.expandedIds.slice();
      expandedIds.push(itemId);

      this.setState({ expandedIds });
    } else if (i !== -1 && !expanded) {
      const expandedIds = this.state.expandedIds.slice();
      expandedIds.splice(i, 1);

      this.setState({ expandedIds });
    }
  };

  private handleItemSiblingExpansion = (expandedIds: string[]) => {
    this.setState({ expandedIds });
  };
}
