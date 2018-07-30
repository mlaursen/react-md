import * as React from "react";
import * as PropTypes from "prop-types";
import { ITreeViewBaseProps } from "./TreeView";

export interface ITreeViewControls extends ITreeViewBaseProps {
  onItemSelect: (itemId: string) => void;
  onItemExpandedChange: (itemId: string, expanded: boolean) => void;
  onSiblingExpansion: (expandedIds: string[]) => void;
  selectedId: string;
  expandedIds: string[];
}

export interface ITreeViewControlsProps extends ITreeViewBaseProps {
  defaultSelectedId?: string;
  defaultExpandedIds?: string[];
  children: (controls: ITreeViewControls) => React.ReactNode;
}

export interface ITreeViewControlsDefaultProps {
  defaultSelectedId: string;
  defaultExpandedIds: string[];
}

export type TreeViewControlsWithDefaultProps = ITreeViewControlsProps & ITreeViewControlsDefaultProps;

export interface ITreeViewControlsState {
  selectedId: string;
  expandedIds: string[];
}

export default class TreeViewControls extends React.Component<ITreeViewControlsProps, ITreeViewControlsState> {
  public static propTypes = {
    className: PropTypes.string,
    defaultSelectedId: PropTypes.string.isRequired,
    defaultExpandedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  public static defaultProps: ITreeViewControlsDefaultProps = {
    defaultSelectedId: "",
    defaultExpandedIds: [],
  };

  constructor(props: ITreeViewControlsProps) {
    super(props);
    const { data, defaultExpandedIds, defaultSelectedId } = props as TreeViewControlsWithDefaultProps;

    let selectedId = defaultSelectedId;
    if (!selectedId.length && data[0] && data[0].itemId) {
      selectedId = data[0].itemId;
    }

    this.state = {
      selectedId,
      expandedIds: defaultExpandedIds,
    };
  }

  public render() {
    const { selectedId, expandedIds } = this.state;
    const {
      defaultSelectedId,
      defaultExpandedIds,
      onItemSelect,
      onItemExpandedChange,
      onSiblingExpansion,
      ...props
    } = this.props;
    return this.props.children({
      ...props,
      selectedId,
      expandedIds,
      onItemSelect: this.handleItemSelect,
      onItemExpandedChange: this.handleItemExpandedChange,
      onSiblingExpansion: this.handleSiblingExpansion,
    });
  }

  private handleItemSelect = (itemId: string) => {
    this.setState({ selectedId: itemId });
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

  private handleSiblingExpansion = (expandedIds: string[]) => {
    this.setState({ expandedIds });
  };
}
