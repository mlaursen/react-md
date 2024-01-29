import { TextDecoder } from "node:util";

if (typeof global.TextDecoder === "undefined") {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error browser TextDecoder does not support `null` while `node:util` does
  global.TextDecoder = TextDecoder;
}
