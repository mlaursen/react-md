import { Main } from "@react-md/core";
import { type ReactElement, type ReactNode } from "react";
import styles from "./LayoutMain.module.scss";

export interface LayoutMainProps {
  children: ReactNode;
}

// export function LayoutMain(props: LayoutMainProps): ReactElement {
//   const { children } = props;
//   const { staticNavExpanded } = useLayoutContext();

//   const { elementProps } = useHorizontalLayoutTransition({
//     transitionIn: staticNavExpanded,
//     className: styles.container,
//   });
//   return (
//     <Main {...elementProps} appBarOffset>
//       {children}
//     </Main>
//   );
// }
export function LayoutMain(props: LayoutMainProps): ReactElement {
  const { children } = props;

  return (
    <Main appBarOffset navOffset className={styles.container}>
      {children}
    </Main>
  );
}
