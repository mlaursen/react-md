import { TextDecoder } from "node:util";

if (typeof global.TextDecoder === "undefined") {
  // @ts-expect-error browser TextDecoder does not support `null` while `node:util` does
  global.TextDecoder = TextDecoder;
}
