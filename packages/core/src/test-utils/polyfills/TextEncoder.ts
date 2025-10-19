import { TextEncoder } from "node:util";

if (typeof global.TextEncoder === "undefined") {
  // @ts-expect-error `node:util` Type 'Uint8Array<ArrayBufferLike>' is not assignable to type 'Uint8Array<ArrayBuffer>'
  global.TextEncoder = TextEncoder;
}
