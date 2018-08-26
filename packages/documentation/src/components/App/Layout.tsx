import * as React from "react";
import cn from "classnames";
import { withRouter, RouteComponentProps } from "react-router";
import { AppBar, AppBarTitle, AppBarNav } from "@react-md/app-bar";
import { AppSizeListener, ResizeListener } from "@react-md/listeners";
import { MenuSVGIcon } from "@react-md/material-icons";
import { Sheet } from "@react-md/sheet";
import { MagicTooltipProvider, TooltipPosition } from "@react-md/tooltip";
import * as _ from "lodash";
import {
  TreeView,
  TreeViewData,
  ITreeViewItemInjectedProps,
  handleItemSelect,
  handleItemExpandedChange,
  findAllParentIds,
} from "@react-md/tree-view";

import "./layout.scss";
import { routes, Route } from "./routes";
import TreeItem from "./TreeItem";

export interface ILayoutProps extends RouteComponentProps<any> {
  children?: React.ReactNode;
}

export interface ILayoutState {
  visible: boolean;
  selectedIds: string[];
  expandedIds: string[];
}

class Layout extends React.Component<ILayoutProps, ILayoutState> {
  constructor(props: ILayoutProps) {
    super(props);

    const selectedIds = [props.location.pathname];
    this.state = {
      visible: false,
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

      this.setState({ selectedIds, expandedIds, visible: false });
    }
  }

  public render() {
    const { visible, selectedIds, expandedIds } = this.state;
    const { children } = this.props;

    return (
      <AppSizeListener>
        {({ isPhone, isTablet, isPortraitTablet, isDesktop }) => {
          const temporary = isPhone || isPortraitTablet;
          let navigation = (
            <nav id="navigation" className="rmd-layout__nav">
              <AppBar theme="clear" fixed={false} className="rmd-layout__nav-header">
                <AppBarTitle id="application-name">react-md</AppBarTitle>
              </AppBar>
              <MagicTooltipProvider position={TooltipPosition.RIGHT} portal={true}>
                <TreeView
                  id="navigation-tree"
                  aria-label="Main Navigation"
                  className="rmd-layout__nav-tree"
                  dense={isDesktop}
                  data={routes}
                  expandedIds={expandedIds}
                  selectedIds={selectedIds}
                  onItemSelect={this.handleItemSelect}
                  onItemExpandedChange={this.handleItemExpandedChange}
                  onMultipleItemExpansion={this.handleMultipleItemExpansion}
                  treeItemRenderer={this.treeItemRenderer}
                />
              </MagicTooltipProvider>
            </nav>
          );

          if (temporary) {
            navigation = (
              <Sheet visible={visible} onRequestClose={this.hideTreeView} position="left">
                {navigation}
              </Sheet>
            );
          }

          return (
            <React.Fragment>
              {navigation}
              <AppBar id="main-header" fixed={true} className="rmd-layout__app-bar">
                {temporary && (
                  <AppBarNav onClick={this.showTreeView}>
                    <MenuSVGIcon />
                  </AppBarNav>
                )}
                <AppBarTitle>react-md</AppBarTitle>
              </AppBar>
              <main className={cn("rmd-layout__main", { "rmd-layout__main--offset": !temporary })}>{children}</main>
            </React.Fragment>
          );
        }}
      </AppSizeListener>
    );
  }

  private showTreeView = () => {
    if (!this.state.visible) {
      this.setState({ visible: true });
    }
  };

  private hideTreeView = () => {
    if (this.state.visible) {
      this.setState({ visible: false });
    }
  };

  private handleItemSelect = (itemId: string) => {
    const selectedIds = handleItemSelect(itemId, this.state.selectedIds);
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

  private handleMultipleItemExpansion = (expandedIds: string[]) => {
    this.setState({ expandedIds });
  };

  private treeItemRenderer = (
    { linkComponent, to, href, leftIcon, children, itemId }: Route,
    props: ITreeViewItemInjectedProps
  ) => {
    if (itemId.startsWith("divider")) {
      return <li role="divider" key={itemId} className="rmd-divider" />;
    } else if (itemId.startsWith("subheader")) {
      return (
        <li key={itemId} className="rmd-subheader">
          {children}
        </li>
      );
    }

    return (
      <TreeItem {...props} itemId={itemId} linkComponent={linkComponent} to={to} href={href} leftIcon={leftIcon}>
        {children}
      </TreeItem>
    );
  };
}

// fails ts for some reason otherwise
export default withRouter(props => <Layout {...props} />);
