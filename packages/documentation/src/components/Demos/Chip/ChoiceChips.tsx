import { ReactElement, useState } from "react";
import { Button } from "@react-md/button";
import { Card, CardContent, CardHeader, CardTitle } from "@react-md/card";
import { Chip } from "@react-md/chip";
import { Divider } from "@react-md/divider";
import { Typography } from "@react-md/typography";

import styles from "./ChoiceChips.module.scss";

const sizes = Array.from({ length: 8 }, (_, i) => {
  const size = (i + 1) * 2;
  return `${size < 10 ? "0" : ""}${size}`;
});

export default function ChoiceChips(): ReactElement {
  const [selectedSize, setSelectedSize] = useState<string>("02");
  return (
    <Card className={styles.container}>
      <CardHeader>
        <CardTitle>Curabitur dictum non.</CardTitle>
      </CardHeader>
      <CardContent disableSecondaryColor>
        <Typography>
          Nulla convallis consectetur dictum. Nunc pellentesque ex eu nulla
          aliquet, eget posuere mi aliquam. Nam gravida nisl eleifend, faucibus
          mauris vitae, accumsan nulla.
        </Typography>
        <Divider />
        <Typography type="subtitle-1" weight="bold" className={styles.subtitle}>
          Select size
        </Typography>
        <div className={styles.content}>
          {sizes.map((size) => (
            <Chip
              key={size}
              className={styles.chip}
              selected={selectedSize === size}
              selectedThemed
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </Chip>
          ))}
        </div>
        <Button
          id="add-to-cart"
          theme="primary"
          themeType="contained"
          className={styles.button}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
