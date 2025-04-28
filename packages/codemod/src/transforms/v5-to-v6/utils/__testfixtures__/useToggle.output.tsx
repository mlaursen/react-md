import { type ReactElement } from "react";
import { Button, useToggle } from "react-md";

export default function Example(): ReactElement {
  const {
    toggled: toggled,
    enable: enable,
    disable: disable,
    toggle: toggle
  } = useToggle();
  return (
    <>
      <Button onClick={enable}>Enable</Button>
      <Button onClick={disable}>Diable</Button>
      <Button onClick={toggle}>Toggle</Button>
      {toggled && <>Hello, world!</>}
    </>
  );
}
