import { type Collection } from "jscodeshift";
import { getPropName } from "./getPropName";

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
        const name = getPropName(attr);
        return !name || !propsSet.has(name);
      });
  });
}
