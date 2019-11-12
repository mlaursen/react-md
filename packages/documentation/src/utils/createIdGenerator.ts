/**
 * An extremely simplified uuid function that is scoped with a speciifc prefix. This
 * will just always increment the total count at the end of the prefix.
 *
 * ```ts
 * const uuid = createIdGenerator("my-custom-prefix");
 *
 * uuid(); // my-custom-prefix-0
 * uuid(); // my-custom-prefix-1
 * uuid(); // my-custom-prefix-2
 * ```
 *
 * @param prefix The string prefix to use
 * @return a function to call to generate a "uuid"
 */
export default function createIdGenerator(prefix: string): () => string {
  const generator = (function* idGenerator() {
    let index = 0;
    while (true) {
      yield `${prefix}-${index}`;
      index += 1;
    }
  })();

  return () => generator.next().value;
}
