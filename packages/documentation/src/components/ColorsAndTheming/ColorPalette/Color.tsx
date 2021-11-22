import { ReactElement } from "react";
import cn from "classnames";
import { Text } from "@react-md/typography";

import styles from "./Color.module.scss";

export interface ColorValue {
  name: string;
  value: string;
}

interface ColorProps extends ColorValue {
  primary?: string;
  secondary?: boolean;
}

export default function Color({
  name,
  value,
  primary,
  secondary,
}: ColorProps): ReactElement {
  const withoutRMD = name.replace("rmd-", "");
  let hexValue = value;
  if (hexValue.length === 4) {
    // ensure that hex colors are always 6 characters instead of their shortened
    // 3 character versions
    hexValue = `${hexValue}${hexValue.substring(1)}`;
  }

  return (
    <li
      className={cn(
        styles.container,
        {
          [styles.primary]: primary,
          [styles.secondary]: secondary,
        },
        styles[withoutRMD]
      )}
    >
      {primary && (
        <Text
          type="headline-6"
          className={styles.header}
          transform="capitalize"
        >
          {primary.replace("-", " ")}
        </Text>
      )}
      <Text component="span" weight="bold">{`$${name}`}</Text>
      <Text component="span" weight="bold" transform="uppercase">
        {hexValue}
      </Text>
    </li>
  );
}
