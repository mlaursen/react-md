import { layoutNav, sheet } from "@react-md/core";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";

export interface NavigationDrawerProps {
  [key: string]: unknown;
}

export function NavigationDrawer(_props: NavigationDrawerProps): ReactElement {
  return (
    <nav
      aria-label="Navigation"
      className={cnb(
        layoutNav({ appBarOffset: true }),
        sheet({ horizontalSize: "none", disableOverlay: true })
      )}
    >
      Navigation
    </nav>
  );
  // const { staticNavExpanded } = useLayoutContext();
  // return (
  //   <>
  //     <LayoutNav appBarOffset expanded={staticNavExpanded}>
  //       Navigation
  //     </LayoutNav>
  //   </>
  // );
}
