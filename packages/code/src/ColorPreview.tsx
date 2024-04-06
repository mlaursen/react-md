import { type ReactElement, type ReactNode } from "react";
import { ColorPreviewRenderer } from "./ColorPreviewRenderer.js";
import { WalkChildren } from "./WalkChildren.js";

// https://stackoverflow.com/a/1636354/744230
const HEX_CODE_REGEX = /#(?:[0-9a-fA-F]{3}){1,2}/gim;

export interface ColorPreviewProps {
  children?: ReactNode;
}

export function ColorPreview(props: ColorPreviewProps): ReactElement {
  const { children } = props;

  return (
    <WalkChildren regex={HEX_CODE_REGEX} renderer={ColorPreviewRenderer}>
      {children}
    </WalkChildren>
  );
}

declare module "react" {
  interface CSSProperties {
    "--color-preview"?: string;
  }
}
