import { type ReactElement } from "react";
import { ColorPreview } from "./ColorPreview.jsx";
import { type WalkChildrenRendererProps } from "./WalkChildren.js";

export interface ColorPreviewRendererProps extends WalkChildrenRendererProps {}

export function ColorPreviewRenderer(
  props: ColorPreviewRendererProps
): ReactElement {
  const { match } = props;
  const [color] = match;

  return <ColorPreview color={color} />;
}
