import type { ReactElement } from "react";
import { MediaContainer } from "react-md";

import styles from "./Container.module.scss";

export default function ForcedAspectRatio(): ReactElement {
  const height = 9;
  const width = 16;
  return (
    <>
      <MediaContainer height={9} width={16} className={styles.container}>
        <img src="https://picsum.photos/400/300?image=3" alt="" />
      </MediaContainer>
      <MediaContainer height={1} width={1} className={styles.container}>
        <img src="https://picsum.photos/400/300?image=623" alt="" />
      </MediaContainer>
      <MediaContainer height={height} width={width} className={styles.container}>
        <iframe
          src="https://www.youtube.com/embed/kyAn3fSs8_A"
          allowFullScreen
          frameBorder="0"
          title="YouTube Video"
        />
      </MediaContainer>
    </>
  );
}
