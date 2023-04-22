import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

/**
 * For some reason the height will be `NaN`/`Infinity` on first render which
 * logs an error in the dev tools. This component will just remove the `height`
 * on the style when it is `NaN`/`Infinity`
 */
export const IgnoreInvalidHeightStyle = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function IgnoreInvalidHeightStyle(props, ref) {
  const { style: propStyle, ...remaining } = props;
  let style = propStyle;
  if (
    propStyle &&
    (Number.isNaN(propStyle.height) || !Number.isFinite(propStyle.height))
  ) {
    const { height: _height, ...fixed } = propStyle;
    style = fixed;
  }

  return <div {...remaining} style={style} ref={ref} />;
});
