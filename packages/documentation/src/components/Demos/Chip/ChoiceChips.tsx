import React, { FC, useState } from "react";
import { Button } from "@react-md/button";
import { Card, CardContent, CardHeader, CardTitle } from "@react-md/card";
import { Chip } from "@react-md/chip";
import { Divider } from "@react-md/divider";
import { Text } from "@react-md/typography";
import { bem } from "@react-md/utils";

import "./ChoiceChips.scss";

const styles = bem("choice-chips");
const sizes = Array.from(new Array(8), (_, i) => {
  const size = (i + 1) * 2;
  return `${size < 10 ? "0" : ""}${size}`;
});

const ChoiceChips: FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>("02");
  return (
    <Card className={styles()}>
      <CardHeader>
        <CardTitle>Curabitur dictum non.</CardTitle>
      </CardHeader>
      <CardContent disableSecondaryColor>
        <Text>
          Nulla convallis consectetur dictum. Nunc pellentesque ex eu nulla
          aliquet, eget posuere mi aliquam. Nam gravida nisl eleifend, faucibus
          mauris vitae, accumsan nulla.
        </Text>
        <Divider />
        <Text type="subtitle-1" weight="bold" className={styles("size")}>
          Select size
        </Text>
        <div className={styles("container")}>
          {sizes.map(size => (
            <Chip
              key={size}
              className={styles("chip")}
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
          className={styles("button")}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChoiceChips;
