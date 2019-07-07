import React, { FC } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";

export interface TextFieldAddonProps {
  first: boolean;
}

const block = bem("rmd-text-field-addon");

const TextFieldAddon: FC<TextFieldAddonProps> = ({ children, first }) => {
  if (!children) {
    return null;
  }

  return <span className={cn(block({ first, last: !first }))}>{children}</span>;
};

export default TextFieldAddon;
