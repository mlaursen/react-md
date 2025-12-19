/**
 * Very simple content slugger for title headers when the content is unique. A
 * real slugger should be used for other use cases.
 *
 * @example Main Usage
 * ```tsx
 * const content = "This is Some Title";
 *
 * <LinkableHeading id={slug(content)} level={1}>{content}</LinkableHeading>
 *
 * // id === "this-is-some-title"
 * ```
 */
export function slug(value: string): string {
  return value.toLowerCase().replaceAll(/\s+/g, "-");
}
