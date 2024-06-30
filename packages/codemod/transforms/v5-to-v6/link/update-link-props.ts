import { type API, type FileInfo, type Options } from "jscodeshift";
import { addFileComments } from "../../utils/addFileComment";
import { removeProps } from "../../utils/removeProps";
import { renameProps } from "../../utils/renameProps";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const comments = new Set<string>();
  traverseImportSpecifiers({
    j,
    root,
    name: "Link",
  }).forEach((name) => {
    removeProps({
      root,
      props: ["preventMaliciousTarget"],
      component: name,
    });

    renameProps({
      root,
      props: {
        flexCentered: "flex",
      },
      component: name,
    });

    root.findJSXElements(name).forEach((jsxElement) => {
      if (
        j(jsxElement).find(j.JSXAttribute, { name: { name: "component" } })
          .length
      ) {
        comments.add(
          "TODO: The `" +
            name +
            "` component from react-md is using the `component` prop which is no longer supported. Use the `link` class name function to apply link styles to a custom component instead."
        );
      }
    });
  });

  addFileComments({
    j,
    root,
    comments,
  });

  return root.toSource(printOptions);
}
