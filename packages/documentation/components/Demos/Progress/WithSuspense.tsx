import React, {
  FunctionComponent,
  lazy,
  Suspense,
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Button } from "@react-md/button";
import { RefreshSVGIcon, CloudDownloadSVGIcon } from "@react-md/material-icons";
import { getProgressA11y, LinearProgress } from "@react-md/progress";
import { bem } from "@react-md/theme";
import { Text, TextContainer } from "@react-md/typography";
import { useVisibility } from "@react-md/utils";

import Phone from "components/Phone";

import "./with-suspense.scss";
import WithSuspenseAppBar from "./WithSuspenseAppBar";
import WithSuspenseFallback from "./WithSuspenseFallback";
import WithSuspenseFiles from "./WithSuspenseFiles";

const block = bem("progress-suspense");

function fakeImport(): Promise<{ default: FunctionComponent }> {
  return new Promise(resolve => {
    let timeout: number | undefined = window.setTimeout(() => {
      timeout = undefined;
      resolve({ default: WithSuspenseFiles });
    }, 5000);
  });
}

enum State {
  READY,
  LOADING,
  COMPELTED,
}

const WithSuspense: FunctionComponent = () => {
  const [state, setState] = useState(State.READY);
  const stateRef = useRef(state);
  const key = useRef(Date.now());
  useEffect(() => {
    if (stateRef.current === State.COMPELTED && state === State.READY) {
      key.current = Date.now();
    }

    stateRef.current = state;
  });

  const handleClick = useCallback(() => {
    switch (stateRef.current) {
      case State.READY:
        setState(State.LOADING);
        break;
      case State.COMPELTED:
        setState(State.READY);
    }
  }, []);
  const complete = useCallback(() => {
    setState(State.COMPELTED);
  }, []);

  const loading = state === State.LOADING;
  const completed = state === State.COMPELTED;

  // you should probably never do this... but this is a way to make it so that
  // the lazy loaded component can be re-loaded infinitely after resetting the
  // demo. Without this, the lazy implementation will immediately resolve the
  // fake import and not show any progress
  const LazyComponent = useMemo(() => lazy(() => fakeImport()), [key.current]);
  return (
    <Phone
      id="with-suspense"
      appBar={<WithSuspenseAppBar />}
      className={block()}
      prominent
    >
      <div
        id="suspense-main-content"
        {...getProgressA11y("with-suspense-progress", loading)}
      >
        <Button
          id="fake-load"
          onClick={handleClick}
          disabled={loading}
          theme="secondary"
          themeType="contained"
          buttonType="icon"
          className={block("load")}
          aria-label={completed ? "Restart Demo" : "Start Demo"}
        >
          {completed ? <RefreshSVGIcon /> : <CloudDownloadSVGIcon />}
        </Button>
        {state !== State.READY && (
          <Suspense fallback={<WithSuspenseFallback complete={complete} />}>
            <LazyComponent />
          </Suspense>
        )}
      </div>
    </Phone>
  );
};

export default WithSuspense;
