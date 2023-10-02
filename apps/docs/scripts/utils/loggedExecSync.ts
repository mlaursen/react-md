import {
  execSync,
  type ExecOptions,
  type ExecSyncOptionsWithBufferEncoding,
  type ExecSyncOptionsWithStringEncoding,
} from "node:child_process";

export function loggedExecSync(command: string, options?: ExecOptions): Buffer;
export function loggedExecSync(
  command: string,
  options: ExecSyncOptionsWithStringEncoding
): string;
export function loggedExecSync(
  command: string,
  options: ExecSyncOptionsWithBufferEncoding
): Buffer;
export function loggedExecSync(
  command: string,
  options: ExecOptions = {}
): Buffer | string {
  // eslint-disable-next-line no-console
  console.log(command);
  return execSync(command, { stdio: "inherit", ...options });
}
