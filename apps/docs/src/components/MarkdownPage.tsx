import { Snackbar } from "@react-md/core/snackbar/Snackbar";
import { ToastManagerProvider } from "@react-md/core/snackbar/ToastManagerProvider";
import { type ReactElement, type ReactNode } from "react";

import styles from "./MarkdownPage.module.scss";

export interface MarkdownPageProps {
  children: ReactNode;
}

export function MarkdownPage(props: MarkdownPageProps): ReactElement {
  const { children } = props;

  return (
    <>
      <div className={styles.container}>
        <ToastManagerProvider>
          {children}
          <Snackbar />
        </ToastManagerProvider>
      </div>
    </>
  );
}

// also support a default export to make it easy to create layouts
export default MarkdownPage;
