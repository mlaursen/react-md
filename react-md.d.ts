// Note: **must** install csstype as a dependency for this to work AND import
// everything for the module augmentation to work.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as CSS from "csstype";

declare module "csstype" {
  // interface Properties {
  // I should create a script to populoate this with:
  // "--rmd-PROPERTY_NAME"?: string | number
  //
  // The index signature doesn't seem to work
  // }
}
