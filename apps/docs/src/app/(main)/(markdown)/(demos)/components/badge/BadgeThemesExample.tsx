import { Badge } from "@react-md/core/badge/Badge";
import { type CSSProperties, type ReactElement } from "react";

export default function BadgeThemesExample(): ReactElement {
  return (
    <>
      <Badge style={style} theme="greyscale">
        1
      </Badge>
      <Badge style={style} theme="primary">
        1
      </Badge>
      <Badge style={style} theme="secondary">
        1
      </Badge>
      <Badge style={style} theme="warning">
        1
      </Badge>
      <Badge style={style} theme="success">
        1
      </Badge>
      <Badge style={style} theme="error">
        1
      </Badge>
      <Badge style={style} theme="surface">
        1
      </Badge>
      <Badge style={style} theme="clear">
        ©
      </Badge>
    </>
  );
}

const style: CSSProperties = {
  position: "static",
};
