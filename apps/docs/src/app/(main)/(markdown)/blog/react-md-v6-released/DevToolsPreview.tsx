"use client";

import { Box } from "@react-md/core/box/Box";
import { CardContent } from "@react-md/core/card/CardContent";
import { CardHeader } from "@react-md/core/card/CardHeader";
import { CardSubtitle } from "@react-md/core/card/CardSubtitle";
import { CardTitle } from "@react-md/core/card/CardTitle";
import { ClickableCard } from "@react-md/core/card/ClickableCard";
import { Dialog } from "@react-md/core/dialog/Dialog";
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
  },
  {
    id: "dev-tools-after-image",
    src: devToolsAfter,
    alt: "Browser DevTools showcasing variables grouped together in react-md@v6",
  },
];

export function DevToolsPreview(): ReactElement {
  const [{ alt, src, visible }, setState] = useState({
    alt: images[0].alt,
    src: images[0].src,
    visible: false,
  });

  return (
    <>
      <Box grid style={{ "--rmd-box-item-min-size": "22rem" }}>
        {images.map(({ id, src, alt }, i) => (
          <ClickableCard
            aria-label="Show full resolution"
            key={id}
            onClick={() => setState({ alt, src, visible: true })}
            className={styles.card}
            disableRipple
          >
            <CardHeader>
              <CardTitle>{i === 0 ? "Before" : "After"}</CardTitle>
              <CardSubtitle>Click to see full image</CardSubtitle>
            </CardHeader>
            <CardContent className={styles.content} disablePadding>
              <Image src={src} alt={alt} />
            </CardContent>
          </ClickableCard>
        ))}
      </Box>
      <Dialog
        aria-label={`Full screen resolution for ${alt}`}
        visible={visible}
        onRequestClose={() => setState((prev) => ({ ...prev, visible: false }))}
      >
        <Image src={src} alt={alt} />
      </Dialog>
    </>
  );
}
