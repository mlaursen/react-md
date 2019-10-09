/* eslint-disable react/no-array-index-key */
import React, { FC, Fragment } from "react";
import { MediaContainer } from "@react-md/media";

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
        <img
          src={`https://picsum.photos${image}`}
          role="presentation"
          alt="From https://picsum.photos"
        />
      </MediaContainer>
    ))}
  </Fragment>
);

export default SimpleResponsiveImages;
