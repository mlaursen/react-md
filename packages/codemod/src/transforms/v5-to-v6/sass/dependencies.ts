import postcss, { type Root } from "postcss";

const EXTRACT_REACT_MD = /(["'])(@?react-md\/[^"']+)\1(\s+as\s+\*)?/;

export function dependencies(root: Root): boolean {
  let changed = false;
  let reactMdAdded = false;
  root.walkAtRules(/use|import/, (node) => {
    const { params } = node;
    const [, , path, aliased = ""] = params.match(EXTRACT_REACT_MD) || [];
    if (
      !path ||
      // already migrated
      path === "react-md" ||
      path === "react-md/a11y" ||
      path === "react-md/colors"
    ) {
      return;
    }

    // if the `color-palette` was included, rename it to `react-md/colors`
    if (path.includes("color-palette")) {
      changed = true;
      node.name = "use";
      node.params = params.replace(path, "react-md/colors");
    } else if (/rmd-|react-md-/.test(params)) {
      // otherwise remove all the other react-md imports and add a
      // single `react-md`. this will probably require manual edits
      // though if they added aliases
      changed = true;
      if (!reactMdAdded) {
        reactMdAdded = true;
        node.before(
          postcss.atRule({
            name: "use",
            params: `"react-md"${aliased}`,
          })
        );
      }
      node.remove();
    }
  });

  return changed;
}
