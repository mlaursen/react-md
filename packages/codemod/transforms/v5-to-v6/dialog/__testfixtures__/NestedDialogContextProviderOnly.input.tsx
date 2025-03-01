import { type ReactElement, type ReactNode } from "react";
import { NestedDialogContextProvider } from "react-md";

export default function App({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return <NestedDialogContextProvider>{children}</NestedDialogContextProvider>;
}
