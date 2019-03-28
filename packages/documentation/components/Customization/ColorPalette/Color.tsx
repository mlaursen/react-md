import React, { FunctionComponent } from "react";
import { bem } from "@react-md/theme";
import { Text } from "@react-md/typography";

export interface ColorValue {
  name: string;
  value: string;
}

interface ColorProps extends ColorValue {
  primary?: string;
  secondary?: boolean;
}

const block = bem("color-palette");

const Color: FunctionComponent<ColorProps> = ({
  name,
  value,
  primary,
  secondary,
}) => {
  const withoutRMD = name.replace("rmd-", "");

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
        {value}
      </Text>
    </li>
  );
};

export default Color;
