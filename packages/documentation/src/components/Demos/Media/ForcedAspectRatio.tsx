import React, { FC } from "react";
import { MediaContainer } from "@react-md/media";

import styles from "./Container.module.scss";

const ForcedAspectRatio: FC = () => (
  <>
    <MediaContainer height={9} width={16} className={styles.container}>
      <img src="https://picsum.photos/400/300?image=3" alt="" />
    </MediaContainer>
    <MediaContainer height={1} width={1} className={styles.container}>
      <img src="https://picsum.photos/400/300?image=623" alt="" />
    </MediaContainer>
    <MediaContainer height={9} width={16} className={styles.container}>
      <iframe
        src="https://www.youtube.com/embed/kyAn3fSs8_A"
        allowFullScreen
        frameBorder="0"
        title="YouTube Video"
      />
    </MediaContainer>
  </>
);

export default ForcedAspectRatio;
