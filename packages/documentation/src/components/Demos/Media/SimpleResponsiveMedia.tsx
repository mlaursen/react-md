import React, { FC } from "react";
import { MediaContainer } from "@react-md/media";

import styles from "./Container.module.scss";

const images = [
  "/200/300?image=30",
  "/300/200?image=3",
  "/300?image=1008",
  "/100/110?image=233",
];

const SimpleResponsiveImages: FC = () => (
  <>
    {images.map((image, i) => (
      <MediaContainer key={i} className={styles.container}>
        <img src={`https://picsum.photos${image}`} alt="" />
      </MediaContainer>
    ))}
  </>
);

export default SimpleResponsiveImages;
