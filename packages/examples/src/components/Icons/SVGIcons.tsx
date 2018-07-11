/* tslint:disable:max-line-length */
import * as React from "react";
import { SVGIcon } from "@react-md/icon";

const SVGIcons: React.SFC<{}> = () => (
  <React.Fragment>
    <SVGIcon className="example-group__example" title="Menu">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SVGIcon>
    <SVGIcon className="example-group__example" title="Mail">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </SVGIcon>
  </React.Fragment>
);

export default SVGIcons;
