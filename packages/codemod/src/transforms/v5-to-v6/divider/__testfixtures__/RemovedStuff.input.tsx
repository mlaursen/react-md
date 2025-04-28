import { type ReactElement } from "react";
import {
  VerticalDividerHeight,
  VerticalDividerHookOptions,
  useVerticalDividerHeight,
} from "react-md";

type H = VerticalDividerHeight;
type O = VerticalDividerHookOptions;

export default function Example(): ReactElement {
  const { ref, style } = useVerticalDividerHeight({
    maxHeight: 0.8,
  });

  return <div style={style} ref={ref} vertical />;
}
