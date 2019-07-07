import React, { FC } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";

export interface TextFieldAddonProps {
  first: boolean;
  underline: boolean;
}

const block = bem("rmd-text-field-addon");

const TextFieldAddon: FC<TextFieldAddonProps> = ({
  children,
  first,
  underline,
}) => {
  if (!children) {
    return null;
  }

  return (
    <span
      className={cn(
        block({
          first,
          last: !first,
          "underline-offset": underline,
          "first-offset": underline && first,
        })
      )}
    >
      {children}
    </span>
  );
};

export default TextFieldAddon;
