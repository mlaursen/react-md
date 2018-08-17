import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { AppBar, AppBarTitle, AppBarNav } from "@react-md/app-bar";
import { MenuSVGIcon } from "@react-md/material-icons";
import {
  TreeView,
  FlattenedTreeView,
  handleSingleItemSelect,
  handleItemExpandedChange,
  findAllParentIds,
} from "@react-md/tree-view";

import "./layout.scss";
import routes from "./routes";

export interface ILayoutProps extends RouteComponentProps<any> {
  children?: React.ReactNode;
}

export interface ILayoutState {
  selectedIds: string[];
  expandedIds: string[];
}

class Layout extends React.Component<ILayoutProps, ILayoutState> {
  constructor(props: ILayoutProps) {
    super(props);

    const selectedIds = [props.location.pathname];
    this.state = {
      selectedIds,
      expandedIds: findAllParentIds(routes, selectedIds),
    };
  }

  public componentDidUpdate(prevProps: ILayoutProps, prevState: ILayoutState) {
    const { pathname } = this.props.location;
    if (pathname !== prevProps.location.pathname) {
      const selectedIds = [pathname];
      const expandedIds = findAllParentIds(routes, selectedIds);
      prevState.expandedIds.forEach(id => {
        if (expandedIds.indexOf(id) === -1) {
          expandedIds.push(id);
        }
      });

      this.setState({ selectedIds, expandedIds });
    }
  }

  public render() {
    const { selectedIds, expandedIds } = this.state;
    const { children } = this.props;
    return (
      <React.Fragment>
        <nav id="navigation" className="rmd-layout__nav">
          <AppBar theme="clear" fixed={true} fixedElevation={false} className="rmd-layout__nav-header">
            <AppBarTitle id="application-name">react-md</AppBarTitle>
          </AppBar>
          <TreeView
            id="navigation-tree"
            aria-label="Main Navigation"
            className="rmd-layout__nav-tree"
            dense={true}
            data={routes}
            expandedIds={expandedIds}
            selectedIds={selectedIds}
            onItemSelect={this.handleItemSelect}
            onItemExpandedChange={this.handleItemExpandedChange}
            onItemSiblingExpansion={this.handleItemSiblingExpansion}
          />
        </nav>
        <AppBar fixed={true} className="rmd-layout__app-bar">
          <AppBarTitle>Components</AppBarTitle>
        </AppBar>
        <main className="rmd-layout__main">{children}</main>
      </React.Fragment>
    );
  }

  private handleItemSelect = (itemId: string) => {
    const selectedIds = handleSingleItemSelect(itemId, this.state.selectedIds);
    if (selectedIds !== this.state.selectedIds) {
      this.setState({ selectedIds });
    }
  };

  private handleItemExpandedChange = (itemId: string, expanded: boolean) => {
    const expandedIds = handleItemExpandedChange(itemId, expanded, this.state.expandedIds);
    if (expandedIds !== this.state.expandedIds) {
      this.setState({ expandedIds });
    }
  };

  private handleItemSiblingExpansion = (expandedIds: string[]) => {
    this.setState({ expandedIds });
  };

  private handleClose = () => {
    console.log("ATTEMPTING_CLOSE");
  };
}

// fails ts for some reason otherwise
export default withRouter(props => <Layout {...props} />);
