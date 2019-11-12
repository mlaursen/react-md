import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { AppBar, AppBarAction } from "@react-md/app-bar";
import { CrossFade } from "@react-md/transition";

import Container from "./Container";
import { Lorem1, Lorem2, Lorem3 } from "./LorumIpsum";

const StaticPageTransition: FC = () => {
  const [page, setPage] = useState<1 | 2 | 3>(1);
  let content = <Lorem1 />;
  if (page === 2) {
    content = <Lorem2 />;
  } else if (page === 3) {
    content = <Lorem3 />;
  }

  // don't want the first render to trigger the animation, but all changes afterwards
  // should.
  const rendered = useRef(false);
  useEffect(() => {
    rendered.current = true;
  }, []);

  return (
    <Fragment>
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
        <CrossFade key={page} appear={rendered.current}>
          {content}
        </CrossFade>
      </Container>
    </Fragment>
  );
};

export default StaticPageTransition;
