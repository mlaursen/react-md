import React, { FC, Fragment, Suspense, useState } from "react";
import { AppBar, AppBarAction } from "@react-md/app-bar";
import { Switch, useCheckboxState } from "@react-md/form";
import { CircularProgress } from "@react-md/progress";
import { CrossFade } from "@react-md/transition";

import useFakeLazyImport from "hooks/useFakeLazyImport";

import Container from "./Container";
import { Lorem1, Lorem2, Lorem3 } from "./LorumIpsum";

interface CurrentPageProps {
  page: number;
}

const CurrentPage: FC<CurrentPageProps> = ({ page }) => {
  let content = <Lorem1 />;
  if (page === 2) {
    content = <Lorem2 />;
  } else if (page === 3) {
    content = <Lorem3 />;
  }

  return <CrossFade>{content}</CrossFade>;
};

const AsyncPageTransitions: FC = () => {
  const [checked, onChange] = useCheckboxState(false);
  const [page, setPage] = useState<0 | 1 | 2 | 3>(0);
  const Content = useFakeLazyImport<CurrentPageProps>(
    CurrentPage,
    page,
    checked ? 0 : 5000
  );

  return (
    <Fragment>
      <Switch
        id="async-immediate"
        label="Disable loading"
        name="immediate"
        onChange={onChange}
        checked={checked}
        iconAfter
      />
      <AppBar theme="default">
        <AppBarAction
          buttonType="text"
          theme={page === 1 ? "primary" : "clear"}
          onClick={() => setPage(1)}
        >
          Page 1
        </AppBarAction>
        <AppBarAction
          buttonType="text"
          theme={page === 2 ? "primary" : "clear"}
          onClick={() => setPage(2)}
        >
          Page 2
        </AppBarAction>
        <AppBarAction
          buttonType="text"
          theme={page === 3 ? "primary" : "clear"}
          onClick={() => setPage(3)}
        >
          Page 3
        </AppBarAction>
      </AppBar>
      <Container>
        {page !== 0 && (
          <Suspense fallback={<CircularProgress id="async-loading-progress" />}>
            <Content page={page} />
          </Suspense>
        )}
      </Container>
    </Fragment>
  );
};

export default AsyncPageTransitions;
