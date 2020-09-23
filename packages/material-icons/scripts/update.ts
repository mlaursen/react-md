import { create } from "./create";
import { download } from "./download";
import { flatten } from "./flatten";

export async function update(): Promise<void> {
  await download("");
  await flatten();
  await create();
}
