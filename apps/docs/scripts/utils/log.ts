import prettyMilliseconds from "pretty-ms";

export async function log(
  name: string,
  path: string,
  task: (path: string) => Promise<void>
): Promise<void> {
  console.log(` ○ Compiling ${name} for ${path} ...`);
  const start = Date.now();
  await task(path);
  const duration = Date.now() - start;
  console.log(` ✓ Compiled ${name} in ${prettyMilliseconds(duration)}`);
}
