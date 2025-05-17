"use client";

import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { CardContent } from "@react-md/core/card/CardContent";
import { CardHeader } from "@react-md/core/card/CardHeader";
import { CardSubtitle } from "@react-md/core/card/CardSubtitle";
import { CardTitle } from "@react-md/core/card/CardTitle";
import { ClickableCard } from "@react-md/core/card/ClickableCard";
import { Dialog } from "@react-md/core/dialog/Dialog";
import { DialogContent } from "@react-md/core/dialog/DialogContent";
import { DialogTitle } from "@react-md/core/dialog/DialogTitle";
import { useAppSize } from "@react-md/core/media-queries/AppSizeProvider";
import { objectFit } from "@react-md/core/objectFit";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import Image from "next/image.js";
import { type ReactElement, useState } from "react";

import styles from "./DevToolsPreview.module.scss";
import devToolsAfter from "./dev-tools-after.png";
import devToolsBefore from "./dev-tools-before.png";

const images = [
  {
    id: "dev-tools-before-image",
    src: devToolsBefore,
    alt: "Browser DevTools showcasing variables split up in prior versions of react-md",
    title: "Before v6",
  },
  {
    id: "dev-tools-after-image",
    src: devToolsAfter,
    alt: "Browser DevTools showcasing variables grouped together in react-md@v6",
    title: "With v6",
  },
];

export function DevToolsPreview(): ReactElement {
  const [{ index, visible }, setState] = useState({
    index: 0,
    visible: false,
  });
  const { isPhone } = useAppSize();
  const image = images[index];
  const close = (): void => {
    setState((prev) => ({ ...prev, visible: false }));
  };

  return (
    <>
      <Box grid gridColumns={{ phone: 1 }} gridItemSize={{ tablet: "22rem" }}>
        {images.map(({ id, src, alt }, i) => (
          <ClickableCard
            aria-label="Show full resolution"
            key={id}
            onClick={() => setState({ index: i, visible: true })}
            className={styles.card}
            disableRipple
          >
            <CardHeader>
              <CardTitle>{i === 0 ? "Before" : "After"}</CardTitle>
              <CardSubtitle>Click to see full image</CardSubtitle>
            </CardHeader>
            <CardContent className={styles.content} disablePadding>
              <Image
                src={src}
                alt={alt}
                className={objectFit({ fit: "cover" })}
              />
            </CardContent>
          </ClickableCard>
        ))}
      </Box>
      <Dialog
        aria-labelledby="fullscreen-title"
        visible={visible}
        onRequestClose={close}
        type={isPhone ? "full-page" : "centered"}
      >
        <Box>
          <DialogTitle id="fullscreen-title" type="headline-6">
            {image.title}
          </DialogTitle>
          <Button aria-label="Close" onClick={close} buttonType="icon">
            <CloseIcon />
          </Button>
        </Box>
        <DialogContent className={styles.dialogContent} disablePadding>
          <Image src={image.src} alt={image.alt} />
        </DialogContent>
      </Dialog>
    </>
  );
}
