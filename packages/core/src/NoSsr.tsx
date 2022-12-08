import type { ReactElement, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useSsr } from "./SsrProvider";

export interface NoSsrProps {
  children: ReactNode;
}

export function NoSsr(props: NoSsrProps): ReactElement {
  const { children } = props;
  const ssr = useSsr();
  const [rendered, setRendered] = useState(!ssr);
  useEffect(() => {
    setRendered(true);
  }, []);

  return <>{rendered && children}</>;
}
