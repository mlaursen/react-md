import type { ReactElement } from "react";
import { MediaContainer } from "react-md";

import styles from "./Container.module.scss";

const images = [
  "/200/300?image=30",
  "/300/200?image=3",
  "/300?image=1008",
  "/100/110?image=233",
];

export default function SimpleMediaExample(): ReactElement {
  return (
    <>
      {images.map((image, i) => (
        <MediaContainer key={i} className={styles.container}>
          <img src={`https://picsum.photos${image}`} alt="" />
        </MediaContainer>
      ))}
    </>
  );
}
