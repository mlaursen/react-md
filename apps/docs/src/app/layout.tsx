import { type ReactElement, type ReactNode } from "react";

export interface RootLayoutProps {
  children: ReactNode;
}

// Added a blank empty layout since not having it causes issues if I ever need
// to use `redirect()` between route groups
export default function RootLayout(props: RootLayoutProps): ReactElement {
  const { children } = props;

  return <>{children}</>;
}
