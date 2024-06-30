// TODO: The following react-md imports have been removed from the library and must be manually removed from the rest of the file: VerticalDividerHeight, VerticalDividerHookOptions, useVerticalDividerHeight
import { type ReactElement } from "react";

type H = VerticalDividerHeight;
type O = VerticalDividerHookOptions;

export default function Example(): ReactElement {
  const { ref, style } = useVerticalDividerHeight({
    maxHeight: 0.8,
  });

  return <div style={style} ref={ref} vertical />;
}
