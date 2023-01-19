import { Button } from "@react-md/core";
import type { ReactElement, ReactNode } from "react";
import { Fragment, useState } from "react";

export interface ResettableProps {
  children: ReactNode;
}

export function Resettable({ children }: ResettableProps): ReactElement {
  const [key, setKey] = useState(0);

  return (
    <>
      <Fragment key={key}>{children}</Fragment>
      <Button
        onClick={() => setKey((key) => (key === 0 ? 1 : 0))}
        floating="bottom-right"
        buttonType="text"
      >
        Reset
      </Button>
    </>
  );
}
