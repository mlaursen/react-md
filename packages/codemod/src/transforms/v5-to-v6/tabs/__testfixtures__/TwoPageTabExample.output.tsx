import { ReactElement, ReactNode } from "react";

import {
  AppBar,
  AppBarAction,
  AppBarNav,
  AppBarTitle,
  FavoriteSVGIcon,
  GridList,
  MediaContainer,
  MenuSVGIcon,
  MoreVertSVGIcon,
  Slide,
  SlideContainer,
  Tab,
  TabList,
  TabProps,
  TimerSVGIcon,
  useAppSize,
  useTabs,
} from "react-md";

const tabs: TabProps[] = [
  { icon: <TimerSVGIcon />, children: "Recent" },
  { icon: <FavoriteSVGIcon />, children: "Favorites" },
];

function Header(): ReactElement {
  const { isTablet } = useAppSize();

  return (
    <AppBar theme="default" height="none">
      <AppBar>
        <AppBarNav aria-label="Menu">
          <MenuSVGIcon />
        </AppBarNav>
        <AppBarTitle>My pictures</AppBarTitle>
        <AppBarAction first last aria-label="Options">
          <MoreVertSVGIcon />
        </AppBarAction>
      </AppBar>
      <TabList {...getTabListProps()} align={isTablet ? "center" : "left"}>{tabs.map((tab, i) => {
          const tabProps = getTabProps(i);
          let children: ReactNode;
          let overrides: TabProps | undefined;

          if (typeof tab !== "string" && "children" in tab) {
            children = tab.children;

            const {
              children: _c,
              contentStyle: _cs,
              contentClassName: _ccn,
              ...stillValidProps
            } = tab;

            overrides = stillValidProps;
          } else {
            children = tab;
          }

          return <Tab {...tabProps} {...overrides} key={tabProps.id}>{children}</Tab>;
        })}</TabList>
    </AppBar>
  );
}

function Panels(): ReactElement {
  return (
    <SlideContainer {...getTabPanelsProps()}>
      <Slide {...getTabPanelProps(0)}>
        <GridList maxCellSize={200} clone>
          {Array.from({ length: 10 }, (_, i) => (
            <MediaContainer key={i}>
              <img src={`https://picsum.photos/200?image=${i + 1}`} alt="" />
            </MediaContainer>
          ))}
        </GridList>
      </Slide>
      <Slide {...getTabPanelProps(1)}>
        <GridList maxCellSize={200} clone>
          {Array.from({ length: 22 }, (_, i) => (
            <MediaContainer key={i}>
              <img src={`https://picsum.photos/200?image=${i + 51}`} alt="" />
            </MediaContainer>
          ))}
        </GridList>
      </Slide>
    </SlideContainer>
  );
}

export default function Demo(): ReactElement {
  const {
    getTabProps,
    getTabListProps,
    getTabPanelProps,
    getTabPanelsProps
  } = useTabs({
    stacked: true,
    baseId: "simple-two-page-tabs"
  });

  return (
    <>
      <Header />
      <Panels />
    </>
  );
}
