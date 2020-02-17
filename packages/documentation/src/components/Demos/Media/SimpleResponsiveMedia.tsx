import React, { FC, Fragment } from "react";
import { LazyImage, MediaContainer } from "@react-md/media";

import "./SimpleResponsiveMedia.scss";

const images = [
  "/200/300?image=30",
  "/300/200?image=3",
  "/300?image=1008",
  "/100/110?image=233",
];

const SimpleResponsiveImages: FC = () => (
  <Fragment>
    {images.map((image, i) => (
      <MediaContainer key={i} className="responsive-item">
        <LazyImage src={`https://picsum.photos${image}`} />
      </MediaContainer>
    ))}
  </Fragment>
);

export default SimpleResponsiveImages;
