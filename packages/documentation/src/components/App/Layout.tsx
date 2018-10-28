import * as React from "react";
import cn from "classnames";
import { Transition } from "react-transition-group";
import { withRouter, RouteComponentProps } from "react-router";
import { AppBar, AppBarTitle, AppBarNav, AppBarAction } from "@react-md/app-bar";
import { AppSizeListener, ResizeListener, IAppSize } from "@react-md/listeners";
import {
  HomeSVGIcon,
  MenuSVGIcon,
  KeyboardArrowLeftSVGIcon,
  SearchSVGIcon,
} from "@react-md/material-icons";
import { Sheet } from "@react-md/sheet";
import { MagicTooltipProvider, TooltipPosition } from "@react-md/tooltip";
import { List, ListItem } from "@react-md/list";
import * as _ from "lodash";
import {
  TreeView,
  TreeViewData,
  ITreeViewItemInjectedProps,
  handleItemSelect,
  handleItemExpandedChange,
  findAllParentIds,
} from "@react-md/tree-view";

import ThemeToggle from "components/ThemeToggle";
import "./layout.scss";
import { routes, Route } from "./routes";
import TreeItem from "./TreeItem";

export interface ILayoutProps extends RouteComponentProps<any> {
  children?: React.ReactNode;
}

export interface ILayoutState {
  offset: boolean;
  visible: boolean;
  selectedIds: string[];
  expandedIds: string[];
}

const timeout = {
  enter: 200,
  exit: 150,
};

const classNames = {
  enter: "rmd-layout__nav--enter",
  enterActive: "rmd-layout__nav--enter-active",
  exit: "rmd-layout__nav--exit",
  exitActive: "rmd-layout__nav--exit-active",
};

class Layout extends React.Component<ILayoutProps, ILayoutState> {
  constructor(props: ILayoutProps) {
    super(props);

    const selectedIds = [props.location.pathname];
    this.state = {
      offset: false,
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
    const { offset, visible, selectedIds, expandedIds } = this.state;
    const { children } = this.props;

    return (
      <AppSizeListener onResize={this.handleResize}>
        {({ isPhone, isTablet, isPortraitTablet, isLandscapeTablet, isDesktop }) => {
          const temporary = isPhone || isPortraitTablet;
          const persistent = isLandscapeTablet;

          return (
            <Transition
              in={!persistent || visible}
              timeout={timeout}
              onEnter={this.handleEnter}
              onEntered={this.handleEntered}
              onExit={this.handleExit}
              onExited={this.handleExited}
            >
              {state => {
                let navigation = (
                  <nav id="navigation" className="rmd-layout__nav">
                    <AppBar theme="clear" fixed={false} className="rmd-layout__nav-header">
                      <AppBarTitle id="application-name">react-md</AppBarTitle>
                      {persistent && (
                        <AppBarAction id="navigation-hide" first={true} onClick={this.hideTreeView}>
                          <KeyboardArrowLeftSVGIcon />
                        </AppBarAction>
                      )}
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

                if (temporary || persistent) {
                  navigation = (
                    <Sheet
                      visible={visible}
                      onRequestClose={this.hideTreeView}
                      position="left"
                      overlay={!persistent}
                      inline={persistent}
                    >
                      {navigation}
                    </Sheet>
                  );
                }

                return (
                  <React.Fragment>
                    {navigation}
                    <AppBar id="main-header" fixed={true} className="rmd-layout__app-bar">
                      {(temporary || persistent) && (
                        <AppBarNav onClick={this.showTreeView} disabled={visible && persistent}>
                          <MenuSVGIcon />
                        </AppBarNav>
                      )}
                      <AppBarTitle
                        className={cn("rmd-layout__title", {
                          "rmd-layout__title--offset": visible && persistent,
                          "rmd-layout__title--offset-2": isDesktop,
                        })}
                      >
                        react-md
                      </AppBarTitle>
                      <ThemeToggle />
                      <AppBarAction
                        className={cn("rmd-layout__action", {
                          "rmd-layout__action--offset":
                            (visible && persistent) || (!persistent && !temporary),
                        })}
                      >
                        <SearchSVGIcon />
                      </AppBarAction>
                    </AppBar>
                    {persistent && (
                      <List className="rmd-sheet rmd-sheet--mini">
                        <ListItem textChildren={false}>
                          <HomeSVGIcon />
                        </ListItem>
                      </List>
                    )}
                    <main
                      className={cn("rmd-layout__main", {
                        "rmd-layout__main--offset": !temporary && (!persistent || visible),
                      })}
                    >
                      {children}
                    </main>
                  </React.Fragment>
                );
              }}
            </Transition>
          );
        }}
      </AppSizeListener>
    );
  }

  private handleResize = (size: IAppSize) => {
    // console.log("size:", size);
  };

  private handleEnter = (node: HTMLElement, isEntering: boolean) => {
    window.requestAnimationFrame(() => {
      this.setState({ offset: true });
    });
  };

  private handleEntered = (node: HTMLElement, isEntering: boolean) => {
    this.setState({ offset: false });
  };

  private handleExit = (node: HTMLElement) => {
    window.requestAnimationFrame(() => {
      this.setState({ offset: true });
    });
  };

  private handleExited = (node: HTMLElement) => {
    this.setState({ offset: false });
  };

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
    itemProps: ITreeViewItemInjectedProps,
    { linkComponent, to, href, leftIcon, children, itemId }: Route
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
      <TreeItem
        {...itemProps}
        itemId={itemId}
        linkComponent={linkComponent}
        to={to}
        href={href}
        leftIcon={leftIcon}
      >
        {children}
      </TreeItem>
    );
  };
}

// fails ts for some reason otherwise
export default withRouter(props => <Layout {...props} />);
