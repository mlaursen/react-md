import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { AppBar, AppBarTitle, AppBarNav } from "@react-md/app-bar";
import { ResizeListener } from "@react-md/listeners";
import { MenuSVGIcon } from "@react-md/material-icons";
import { Sheet } from "@react-md/sheet";
import { MagicTooltipProvider, TooltipPosition } from "@react-md/tooltip";
import {
  TreeView,
  TreeViewData,
  ITreeViewItemInjectedProps,
  handleSingleItemSelect,
  handleItemExpandedChange,
  findAllParentIds,
} from "@react-md/tree-view";

import "./layout.scss";
import routes from "./routes";
import TreeItem from "./TreeItem";

interface IAppSize {
  visible: boolean;
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isPortraitPhone: boolean;
  isLandscapePhone: boolean;
  isPortraitTablet: boolean;
  isLandscapeTablet: boolean;
  isDesktopPhone: boolean;
  isDesktopTablet: boolean;
}

export interface ILayoutProps extends RouteComponentProps<any> {
  children?: React.ReactNode;
}

export interface ILayoutState extends IAppSize {
  selectedIds: string[];
  expandedIds: string[];
}

class Layout extends React.Component<ILayoutProps, ILayoutState> {
  constructor(props: ILayoutProps) {
    super(props);

    const defaultSize: string = "desktop";
    const selectedIds = [props.location.pathname];
    const isPortraitPhone = defaultSize === "portrait-phone";
    const isLandscapePhone = defaultSize === "landscape-phone";
    const isPortraitTablet = defaultSize === "portrait-tablet";
    const isLandscapeTablet = defaultSize === "landscape-tablet";
    const isDesktopPhone = defaultSize === "desktop-phone";
    const isDesktopTablet = defaultSize === "desktop-tablet";
    this.state = {
      visible: false,
      selectedIds,
      expandedIds: findAllParentIds(routes, selectedIds),
      isPhone: defaultSize === "phone" || isPortraitPhone || isLandscapePhone,
      isTablet: defaultSize === "tablet" || isPortraitTablet || isLandscapeTablet,
      isDesktop: defaultSize === "desktop" || isDesktopPhone || isDesktopTablet,
      isPortraitPhone,
      isLandscapePhone,
      isPortraitTablet,
      isLandscapeTablet,
      isDesktopPhone,
      isDesktopTablet,
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
    const { selectedIds, expandedIds, isPhone, isTablet, isDesktop, visible } = this.state;
    const { children } = this.props;

    let navigation = (
      <nav id="navigation" className="rmd-layout__nav">
        <AppBar theme="clear" fixedElevation={false} className="rmd-layout__nav-header">
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
            onItemSiblingExpansion={this.handleItemSiblingExpansion}
            treeItemRenderer={this.treeItemRenderer}
          />
        </MagicTooltipProvider>
      </nav>
    );

    if (isPhone) {
      navigation = (
        <Sheet visible={visible} onRequestClose={this.hideTreeView} position="left">
          {navigation}
        </Sheet>
      );
    }

    return (
      <React.Fragment>
        {navigation}
        <AppBar fixed={true} className="rmd-layout__app-bar">
          {isPhone && (
            <AppBarNav onClick={this.showTreeView}>
              <MenuSVGIcon />
            </AppBarNav>
          )}
          <AppBarTitle>react-md</AppBarTitle>
        </AppBar>
        <main className="rmd-layout__main">{children}</main>
        <ResizeListener onResize={this.handleResize} />
      </React.Fragment>
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

  private handleResize = () => {
    const tabletMinWidth = 768;
    const desktopMinWidth = 1025;
    const phoneMedia = `screen and (max-width: ${tabletMinWidth - 1}px)`;
    const tabletMedia = `screen and (min-width: ${tabletMinWidth}px) and (max-width: ${desktopMinWidth - 1}px)`;
    const desktopMedia = `screen and (min-width: ${desktopMinWidth}px)`;

    const matchesTablet = window.matchMedia(tabletMedia).matches;

    const portrait = window.innerHeight > window.innerWidth;
    const isDesktop = window.matchMedia(desktopMedia).matches;
    const isTablet = !isDesktop && matchesTablet;
    const isPhone = !isDesktop && !isTablet;
    const isPortraitPhone = isPhone && portrait;
    const isLandscapePhone = isPhone && !portrait;
    const isPortraitTablet = isTablet && portrait;
    const isLandscapeTablet = isTablet && !portrait;
    const isDesktopPhone = isDesktop && window.matchMedia(phoneMedia).matches;
    const isDesktopTablet = isDesktop && matchesTablet;
    const nextState: IAppSize = {
      isPhone,
      isTablet,
      isDesktop,
      isPortraitPhone,
      isLandscapePhone,
      isPortraitTablet,
      isLandscapeTablet,
      isDesktopPhone,
      isDesktopTablet,
      visible: isPhone && this.state.visible,
    };

    // I don't know how to get TS to accept this without doing an index key
    // @ts-ignore
    if (Object.keys(nextState).some(key => this.state[key] !== nextState[key])) {
      this.setState(nextState);
    }
  };

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

  private treeItemRenderer = (
    { linkComponent, to, href, leftIcon, children, divider, itemId }: TreeViewData,
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
      <TreeItem {...props} linkComponent={linkComponent} to={to} href={href} leftIcon={leftIcon}>
        {children}
      </TreeItem>
    );
  };
}

// fails ts for some reason otherwise
export default withRouter(props => <Layout {...props} />);
