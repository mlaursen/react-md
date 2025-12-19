/**
 * @since 6.5.1
 * @internal
 */
export function createAcceptFromExtensions(
  extensions: readonly string[]
): string {
  let accept = "";
  for (const extension of extensions) {
    if (accept) {
      accept += ",";
    }

    accept += `.${extension}`;
  }

  return accept;
}
