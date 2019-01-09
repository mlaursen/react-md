import clean from "./clean";
import build from "./build";

export default async function prepublish() {
  await clean();
  await build();
}
