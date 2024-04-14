/* eslint-disable no-console */
import prettyMilliseconds from "pretty-ms";

export function logPending(message: string): void {
  console.log(` ○ ${message} ...`);
}

export function logComplete(message: string, duration?: number): void {
  const suffix =
    typeof duration === "number" ? ` in ${prettyMilliseconds(duration)}` : "";
  console.log(` ✓ ${message}${suffix}`);
}

export async function log<Result>(
  task: Promise<Result>,
  startMessage: string,
  endMessage: string
): Promise<Result> {
  if (process.env.NODE_ENV === "production" || (!startMessage && !endMessage)) {
    return task;
  }

  if (startMessage) {
    logPending(startMessage);
  }

  const start = Date.now();
  const result = await task;
  const duration = Date.now() - start;
  logComplete(endMessage, duration);
  return result;
}
