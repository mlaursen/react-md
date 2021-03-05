import React, { ReactElement, useState } from "react";
import cn from "classnames";
import { RadioGroup } from "@react-md/utils";

import styles from "./SimpleRadioGroup.module.scss";

export default function SimpleRadioGroup(): ReactElement | null {
  const [value, setValue] = useState("");
  return (
    <RadioGroup
      id="simple-radio-group"
      aria-label="Radio Group"
      className={styles.container}
      value={value}
      onChange={setValue}
      items={["One", "Two", "Three"]}
      getRadioClassName={(item) =>
        cn(styles.radio, {
          [styles.checked]: item.checked,
        })
      }
    />
  );
}
