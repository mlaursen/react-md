import { type Collection } from "jscodeshift";

export interface RemovePropsOptions {
  root: Collection<unknown>;
  props: readonly string[] | ReadonlySet<string>;
  component: string;
}

export function removeProps(options: RemovePropsOptions): void {
  const { root, props, component } = options;
  const propsSet = new Set(props);

  root.findJSXElements(component).forEach((path) => {
    path.node.openingElement.attributes =
      path.node.openingElement.attributes?.filter((attr) => {
        if (attr.type !== "JSXAttribute") {
          return true;
        }

        const name =
          typeof attr.name.name === "string"
            ? attr.name.name
            : attr.name.name.name;

        return !propsSet.has(name);
      });
  });
}
