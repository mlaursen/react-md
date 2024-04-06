import { type ReactElement } from "react";
import { InlineCode } from "./InlineCode.js";
import { type WalkChildrenRendererProps } from "./WalkChildren.js";

export interface ColorPreviewRendererProps extends WalkChildrenRendererProps {}

export function ColorPreviewRenderer(
  props: ColorPreviewRendererProps
): ReactElement {
  const { match } = props;
  const [color] = match;

  return (
    <span style={{ "--color-preview": color }} className="color-preview">
      <InlineCode>{color}</InlineCode>
    </span>
  );
}
