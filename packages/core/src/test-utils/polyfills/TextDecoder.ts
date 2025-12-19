import { TextDecoder } from "node:util";

if (globalThis.TextDecoder === undefined) {
  // @ts-expect-error browser TextDecoder does not support `null` while `node:util` does
  globalThis.TextDecoder = TextDecoder;
}
