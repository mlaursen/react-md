import type { ReactElement } from "react";
import { ResponsiveItem } from "react-md";

import styles from "./Container.module.scss";

export default function ForcedAspectRatio(): ReactElement {
  const height = 9;
  const width = 16;
  return (
    <>
      <ResponsiveItem className={styles.container} aspectRatio="16-9">
        <img src="https://picsum.photos/400/300?image=3" alt="" />
      </ResponsiveItem>
      <ResponsiveItem className={styles.container} aspectRatio="1-1">
        <img src="https://picsum.photos/400/300?image=623" alt="" />
      </ResponsiveItem>
      <ResponsiveItem className={styles.container} aspectRatio={`${width}-${height}`}>
        <iframe
          src="https://www.youtube.com/embed/kyAn3fSs8_A"
          allowFullScreen
          frameBorder="0"
          title="YouTube Video"
        />
      </ResponsiveItem>
    </>
  );
}
