import {
  AppBar,
  CircularProgress,
  CrossFade,
  Tab,
  TabList,
  Typography,
  useTabs,
} from "@react-md/core";
import type { ReactElement } from "react";
import { Suspense, useEffect, useRef } from "react";
import { useFakeLazyImport } from "src/utils/useFakeLazyImport";
import { ExamplePage1 } from "../ExamplePage1";
import { ExamplePage2 } from "../ExamplePage2";
import { ExamplePage3 } from "../ExamplePage3";

interface CurrentPageProps {
  page: number;
}

function CurrentPage({ page }: CurrentPageProps): ReactElement {
  let content = <ExamplePage1 />;
  if (page === 1) {
    content = <ExamplePage2 />;
  } else if (page === 2) {
    content = <ExamplePage3 />;
  }

  return <CrossFade>{content}</CrossFade>;
}

export function WithAsyncSuspense(): ReactElement {
  const selectedOnce = useRef(false);
  const { activeIndex, getTabProps, getTabListProps } = useTabs();

  // just make it so it doesn't start loading until a new tab is shown
  const Content = useFakeLazyImport<CurrentPageProps>(
    CurrentPage,
    activeIndex,
    5000
  );
  useEffect(() => {
    selectedOnce.current = true;
  }, []);

  return (
    <>
      <AppBar theme="surface" height="auto">
        <TabList {...getTabListProps()} align="center">
          <Tab {...getTabProps(0)}>Page 1</Tab>
          <Tab {...getTabProps(1)}>Page 2</Tab>
          <Tab {...getTabProps(2)}>Page 3</Tab>
        </TabList>
      </AppBar>
      {!selectedOnce.current && (
        <Typography type="headline-6">
          {'Click on "Page 2" or "Page 3" to start the demo'}
        </Typography>
      )}
      {selectedOnce.current && (
        <Suspense fallback={<CircularProgress />}>
          <Content page={activeIndex} />
        </Suspense>
      )}
    </>
  );
}
