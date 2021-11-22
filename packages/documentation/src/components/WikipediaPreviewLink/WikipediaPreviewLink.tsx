import { ReactElement, ReactNode, useRef } from "react";
import { DialogContent, FixedDialog } from "@react-md/dialog";
import { Link } from "@react-md/link";
import { BELOW_CENTER_ANCHOR, useHoverMode } from "@react-md/utils";

import { useId } from "components/IdProvider";

import styles from "./WikipediaPreviewLink.module.scss";

export interface WikipediaPreviewLinkProps {
  /**
   * The wikipedia URL
   */
  href: string;

  /**
   * The content to display in the preview window.
   */
  preview: ReactNode;

  /**
   * The link contents.
   */
  children: ReactNode;
}

export default function WikipediaPreviewLink({
  href,
  preview,
  children,
}: WikipediaPreviewLinkProps): ReactElement {
  const id = useId("wiki");
  const { active, handlers, visible, setVisible } = useHoverMode();

  const linkRef = useRef<HTMLAnchorElement>(null);
  return (
    <>
      <Link ref={linkRef} href={href} {...handlers}>
        {children}
      </Link>
      <FixedDialog
        aria-label="Wikipedia Preview"
        id={id}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        {...handlers}
        fixedTo={linkRef.current}
        onClick={() => {
          window.location.href = href;
        }}
        disableFocusContainer={active}
        disableScrollLock={!active}
        anchor={BELOW_CENTER_ANCHOR}
        options={{ preventOverlap: true }}
        overlay={active ? false : undefined}
        className={styles.dialog}
      >
        <DialogContent>{preview}</DialogContent>
      </FixedDialog>
    </>
  );
}
