import { type ReactElement, type ReactNode } from "react";

import "./layout.scss";

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({
  children,
}: Readonly<LayoutProps>): ReactElement {
  return <>{children}</>;
}
