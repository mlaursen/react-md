import { SVGIcon, TextIconSpacing, FontIcon } from "@react-md/icon";
import { Configuration } from "@react-md/layout";
import * as React from "react";

export default function Example(): React.ReactElement {
  return (
    <Configuration>
      <FontIcon>hello</FontIcon>
      <TextIconSpacing
        icon={
          <SVGIcon>
            <path d="1 2 3" />
          </SVGIcon>
        }
      >
        Hello, world!
      </TextIconSpacing>
    </Configuration>
  );
}
