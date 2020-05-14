import React, {
  FC,
  Suspense,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import cn from "classnames";
import { APP_BAR_OFFSET_PROMINENT_CLASSNAME } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { RefreshSVGIcon, CloudDownloadSVGIcon } from "@react-md/material-icons";
import { getProgressA11y } from "@react-md/progress";
import { useAppSize } from "@react-md/utils";

import Phone from "components/Phone";
import useFakeLazyImport from "hooks/useFakeLazyImport";

import WithSuspenseAppBar from "./WithSuspenseAppBar";
import WithSuspenseFallback from "./WithSuspenseFallback";
import WithSuspenseFiles from "./WithSuspenseFiles";

import styles from "./WithSuspense.module.scss";

enum State {
  READY,
  LOADING,
  COMPELTED,
}

const WithSuspense: FC = () => {
  const [state, setState] = useState(State.READY);
  const stateRef = useRef(state);
  const key = useRef(Date.now());
  useEffect(() => {
    if (stateRef.current === State.COMPELTED && state === State.READY) {
      key.current = Date.now();
    }

    stateRef.current = state;
  });

  const reset = useCallback(() => {
    setState(State.READY);
  }, []);
  const complete = useCallback(() => {
    setState(State.COMPELTED);
  }, []);

  const handleClick = useCallback(() => {
    switch (stateRef.current) {
      case State.READY:
        setState(State.LOADING);
        break;
      case State.COMPELTED:
        reset();
      // no default
    }
  }, [reset]);
  const { isPhone } = useAppSize();

  const loading = state === State.LOADING;
  const completed = state === State.COMPELTED;

  const LazyComponent = useFakeLazyImport(WithSuspenseFiles, key.current);
  return (
    <Phone
      id="with-suspense"
      appBar={<WithSuspenseAppBar />}
      contentClassName={cn({
        [APP_BAR_OFFSET_PROMINENT_CLASSNAME]: isPhone,
      })}
      prominent
      disableAppBar
      disableContent
      onPhoneClose={reset}
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
          className={styles.button}
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
