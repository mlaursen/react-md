import { type ReactElement, type ReactNode } from "react";

export default function App({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return <>{children}</>;
}
