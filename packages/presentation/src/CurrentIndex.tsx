import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState,
  useRef,
} from "react";
import { withRouter } from "react-router";

function getIndex(pathname: string) {
  const v = parseInt(pathname.replace(/.*\-/, ""), 10);
  return isNaN(v) ? -1 : v;
}

const context = createContext(0);
const { Provider } = context;

export function useCurrentContext() {
  return useContext(context);
}

const CurrentIndex: FunctionComponent<any> = ({
  children,
  location: { pathname },
}) => {
  const [current, setCurrent] = useState(() => getIndex(pathname));
  const prevPathame = useRef(pathname);
  if (prevPathame.current !== pathname) {
    setCurrent(getIndex(pathname));
    prevPathame.current = pathname;
  }

  return <Provider value={current}>{children}</Provider>;
};

export default withRouter(CurrentIndex);
