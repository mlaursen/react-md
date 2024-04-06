import { alphaNumericSort } from "react-md";

export function printObjectAlphaNumerically(
  obj: Record<string, unknown>
): string {
  const sortedKeyValuePairs = alphaNumericSort(Object.entries(obj), {
    extractor: ([name]) => name,
  })
    .map(([name, value]) => `"${name}": ${JSON.stringify(value)}`)
    .join(",\n");

  return `{${sortedKeyValuePairs}}`;
}
