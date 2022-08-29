import { Button } from "@react-md/button";
import { Box } from "@react-md/core";
import { Dialog } from "@react-md/dialog";
import type { ReactElement } from "react";
import { useState } from "react";

import styles from "./FullPageExample.module.scss";
import { ImagePreviewDialogContent } from "./ImagePreviewDialogContent";

// just grabbed some "large" images from https://picsum.photos/list
interface FullImageData {
  format: string;
  height: number;
  width: number;
  filename: string;
  id: number;
  author: string;
  author_url: string;
  post_url: string;
}

const IMAGES: Record<string, FullImageData> = {
  277: {
    format: "jpeg",
    width: 5616,
    height: 3744,
    filename: "0277_pElM4yerF5Q.jpeg",
    id: 277,
    author: "Taylor Leopold",
    author_url: "https://unsplash.com/@taylorleopold",
    post_url: "https://unsplash.com/photos/pElM4yerF5Q",
  },
  278: {
    format: "jpeg",
    width: 5616,
    height: 3744,
    filename: "0278_6QQqqvq4R9A.jpeg",
    id: 278,
    author: "Taylor Leopold",
    author_url: "https://unsplash.com/@taylorleopold",
    post_url: "https://unsplash.com/photos/6QQqqvq4R9A",
  },
  279: {
    format: "jpeg",
    width: 5616,
    height: 3744,
    filename: "0279_OHS0yA7OkrQ.jpeg",
    id: 279,
    author: "Taylor Leopold",
    author_url: "https://unsplash.com/@taylorleopold",
    post_url: "https://unsplash.com/photos/OHS0yA7OkrQ",
  },
  280: {
    format: "jpeg",
    width: 5491,
    height: 3661,
    filename: "0280_yIDqQ15KgRI.jpeg",
    id: 280,
    author: "Jay Wennington",
    author_url: "https://unsplash.com/@jaywennington",
    post_url: "https://unsplash.com/photos/yIDqQ15KgRI",
  },
  281: {
    format: "jpeg",
    width: 4928,
    height: 3264,
    filename: "0281__poRbNNfcE8.jpeg",
    id: 281,
    author: "Victor Erixon",
    author_url: "https://unsplash.com/@victorerixon",
    post_url: "https://unsplash.com/photos/_poRbNNfcE8",
  },
  282: {
    format: "jpeg",
    width: 5616,
    height: 3744,
    filename: "0282_9dw0xLlxw1s.jpeg",
    id: 282,
    author: "Taylor Leopold",
    author_url: "https://unsplash.com/@taylorleopold",
    post_url: "https://unsplash.com/photos/9dw0xLlxw1s",
  },
  283: {
    format: "jpeg",
    width: 3823,
    height: 2538,
    filename: "0283_GtxZbYMCiPY.jpeg",
    id: 283,
    author: "Wojtek Witkowski",
    author_url: "https://unsplash.com/@wojtek",
    post_url: "https://unsplash.com/photos/GtxZbYMCiPY",
  },
  284: {
    format: "jpeg",
    width: 2048,
    height: 1365,
    filename: "0284_MpSnQAUTgcE.jpeg",
    id: 284,
    author: "Ariana Prestes",
    author_url: "https://unsplash.com/@arianaprestes",
    post_url: "https://unsplash.com/photos/MpSnQAUTgcE",
  },
  287: {
    format: "jpeg",
    width: 4288,
    height: 2848,
    filename: "0287_c54ZhWDLEDo.jpeg",
    id: 287,
    author: "Aleksandra Boguslawska",
    author_url: "https://unsplash.com/@aleksandraboguslawska",
    post_url: "https://unsplash.com/photos/c54ZhWDLEDo",
  },
};

const validIds = Object.keys(IMAGES);
const previews = validIds.map((id) => ({
  src: `https://picsum.photos/id/${id}/100`,
  id,
}));

export default function FullPageExample(): ReactElement {
  const [state, setState] = useState({ imageId: "277", visible: false });
  const show = (imageId: string) => (): void => {
    setState({ visible: true, imageId });
  };
  const hide = (): void => {
    setState((prevState) => ({ ...prevState, visible: false }));
  };

  const { visible, imageId } = state;
  const { filename, height, width } = IMAGES[imageId] || {
    filename: "",
    height: 0,
    width: 0,
  };
  return (
    <Box grid className={styles.grid}>
      {previews.map(({ src, id }) => (
        <Button aria-label="Show fullscreen" key={id} onClick={show(id)}>
          <img src={src} alt="" />
        </Button>
      ))}
      <Dialog
        id="image-preview-dialog"
        type="full-page"
        visible={visible}
        onRequestClose={hide}
        aria-labelledby="dialog-title"
      >
        <ImagePreviewDialogContent
          onRequestClose={hide}
          src={`https://picsum.photos/id/${imageId}/${width}/${height}`}
          filename={filename}
        />
      </Dialog>
    </Box>
  );
}
