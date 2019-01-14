import { Maybe } from "@react-md/utils";

export function getNodesByRole(
  node: Maybe<HTMLElement>,
  roles: string | string[]
) {
  if (!node) {
    return [];
  }

  roles = Array.isArray(roles) ? roles : [roles];
  const query = roles
    .map(role => `[role="${role}"]:not([aria-disabled="true"])`)
    .join(",");

  return Array.from(node.querySelectorAll(query)) as HTMLElement[];
}
