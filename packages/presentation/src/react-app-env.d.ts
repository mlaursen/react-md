/// <reference types="react-scripts" />
import { FunctionComponent } from "react";

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.module.scss" {
  const content: any;
  export default content;
}
