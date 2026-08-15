import { format as oxfmt } from "oxfmt";

export async function format(code: string): Promise<string> {
  return (await oxfmt("Component.tsx", code)).code;
}
