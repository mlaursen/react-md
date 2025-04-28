import type { Collection, JSXElement } from "jscodeshift";

interface Options {
  root: Collection<unknown>;
  props: Record<string, string>;
  component: string;
}

export function renameProps({
  root,
  props,
  component,
}: Options): Collection<JSXElement> {
  const toRename = Object.keys(props);

  return root.findJSXElements(component).forEach((path) => {
    path.node.openingElement.attributes?.forEach((node) => {
      if (
        node.type === "JSXAttribute" &&
        typeof node.name.name === "string" &&
        toRename.includes(node.name.name)
      ) {
        node.name.name = props[node.name.name];
      }
    });
  });
}
