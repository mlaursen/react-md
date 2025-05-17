import { useAppSize } from "@react-md/core/media-queries/AppSizeProvider";
import { type ReactElement, type ReactNode } from "react";

export interface DesktopOnlyProps {
  children: ReactNode;
}

export function DesktopOnly({
  children,
}: Readonly<DesktopOnlyProps>): ReactElement {
  const { isDesktop } = useAppSize();
  return <>{isDesktop && children}</>;
}
