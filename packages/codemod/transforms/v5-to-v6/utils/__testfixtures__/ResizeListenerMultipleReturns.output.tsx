import { type ReactElement } from "react";
import { Typography, useResizeListener } from "react-md";

export default function Example({
  someProp,
  options,
  handleResize,
}): ReactElement {
  useResizeListener({
    onUpdate: handleResize,

    ...(typeof options === "boolean" ? {
      capture: options
    } : options)
  });

  if (someProp) {
    return <Typography>This is some stuff</Typography>;
  }

  return (<>
    <Typography>Some other stuff</Typography>

  </>);
}
