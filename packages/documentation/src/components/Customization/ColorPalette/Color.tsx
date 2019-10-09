import React, { FC } from "react";
import { Text } from "@react-md/typography";
import { bem } from "@react-md/utils";

export interface ColorValue {
  name: string;
  value: string;
}

interface ColorProps extends ColorValue {
  primary?: string;
  secondary?: boolean;
}

const block = bem("color-palette");

const Color: FC<ColorProps> = ({ name, value, primary, secondary }) => {
  const withoutRMD = name.replace("rmd-", "");
  let hexValue = value;
  if (hexValue.length === 4) {
    // ensure that hex colors are always 6 characters instead of their shortened
    // 3 character versions
    hexValue = `${hexValue}${hexValue.substring(1)}`;
  }

  return (
    <li
      className={block("color", {
        primary,
        secondary,
        [withoutRMD]: true,
      })}
    >
      {primary && (
        <Text
          type="headline-6"
          className={block("primary-color")}
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
};

export default Color;
