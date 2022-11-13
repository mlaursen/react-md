import { Button } from "@react-md/button";
import { Collapse, useToggle } from "@react-md/core";
import type { ReactElement } from "react";
import { ExamplePage1 } from "../ExamplePage1";

export function SimpleExample(): ReactElement {
  const { toggled, toggle } = useToggle(true);

  return (
    <>
      <Button onClick={toggle}>Toggle</Button>
      <Collapse collapsed={toggled}>
        <ExamplePage1 />
      </Collapse>
    </>
  );
}
