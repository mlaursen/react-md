import { Maybe } from "@react-md/utils";
import { getNodesByRole } from "./getNodesByRole";

export interface ILoopOptions {
  roles: string | string[];
  first?: boolean;
  last?: boolean;
  increment?: boolean;
}

function error(message: string, ...others: any[]) {
  if (process.env.NODE_ENV !== "production") {
    console.error(message);
    others.forEach(other => console.error(other));
    console.error(new Error().stack);
  }

  return "";
}

export default function loop(x: number, max: number, increment: boolean) {
  let next = x + (increment ? 1 : -1);
  if (next > max) {
    next = 0;
  } else if (next < 0) {
    next = max;
  }

  return next;
}

export function loopByRole(node: Maybe<HTMLElement>, options: ILoopOptions) {
  const { first = false, last = false, increment = true, roles } = options;
  if (!node) {
    return "";
  }

  const activeId = node.getAttribute("aria-activedescendant") || "";
  if (!activeId) {
    return error(
      "Unable to loop through nodes when there is not a valid " +
        "`aria-activedecendant` attribute on the root node."
    );
  }

  const active = document.getElementById(activeId) as HTMLElement | null;
  if (!active) {
    return error(
      "Unable to loop through nodes when the provided `aria-activedescendant` id" +
        `(${activeId}) does not have a valid element in the page.`
    );
  }

  const nodes = getNodesByRole(node, roles);
  if (process.env.NODE_ENV !== "production") {
    const withoutIds = nodes.filter(node => !node.id);
    if (withoutIds.length) {
      return error(
        "Unable to loop through nodes when the child elements do not have ids " +
          "since the focus behavior is determined by `aria-activedescendant`." +
          "This will need to be fixed before moving to production as keyboard " +
          "focus behavior will not work until this is fixed.",
        withoutIds
      );
    }
  }

  if (!nodes.length) {
    return "";
  }

  let nextNode: Maybe<HTMLElement> = null;
  if (first || (last && nodes.length <= 1)) {
    nextNode = nodes[0];
  } else if (last) {
    nextNode = nodes[nodes.length - 1];
  } else {
    const currentIndex = nodes.findIndex(node => node === active);
    nextNode = nodes[loop(currentIndex, nodes.length - 1, increment)];
  }

  return (nextNode && nextNode.id) || "";
}
