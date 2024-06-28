import { CoreProviders } from "@react-md/core/CoreProviders";
import { FontIcon } from "@react-md/core/icon/FontIcon";
import { SVGIcon } from "@react-md/core/icon/SVGIcon";
import { TextIconSpacing } from "@react-md/core/icon/TextIconSpacing";
import * as React from "react";

export default function Example(): React.ReactElement {
  return (
    <CoreProviders>
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
    </CoreProviders>
  );
}
