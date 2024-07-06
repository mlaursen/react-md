import { type ReactElement } from "react";
import { ResizeListener, Typography } from "react-md";

export default function Example({
  someProp,
  options,
  handleResize,
}): ReactElement {
  if (someProp) {
    return <Typography>This is some stuff</Typography>;
  }

  return (
    <>
      <Typography>Some other stuff</Typography>
      <ResizeListener onResize={handleResize} options={options} />
    </>
  );
}
