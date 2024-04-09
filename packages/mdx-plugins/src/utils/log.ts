/* eslint-disable no-console */
import prettyMilliseconds from "pretty-ms";

export async function log<Result>(
  task: Promise<Result>,
  startMessage: string,
  endMessage: string
): Promise<Result> {
  if (!startMessage && !endMessage) {
    return task;
  }

  if (startMessage) {
    console.log(` ○ ${startMessage} ...`);
  }

  const start = Date.now();
  const result = await task;
  const duration = Date.now() - start;
  console.log(` ✓ ${endMessage} in ${prettyMilliseconds(duration)}`);
  return result;
}
