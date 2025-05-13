import { type Root } from "postcss";
import postcssValueParser, { type FunctionNode } from "postcss-value-parser";

import { type TransformSassItemOptions } from "../../../utils/types.js";
import { addTodo, createTodoComment } from "./addTodo.js";
import { removeItem } from "./removeItem.js";
import { renameItem } from "./renameItem.js";
import { getThemeMigration } from "./themeAPI.js";

export function declarations(root: Root): boolean {
  let changed = false;
  root.walkDecls((decl) => {
    if (!/rmd-/.test(decl.value)) {
      return;
    }

    let valueChanged = false;
    const parsed = postcssValueParser(decl.value);
    parsed.walk((node) => {
      const isVariable = node.type === "word";
      if (!isVariable && node.type !== "function") {
        return;
      }

      const startIndex = node.value.indexOf((isVariable ? "$" : "") + "rmd-");
      if (startIndex === -1) {
        return;
      }
      let prefix = "";
      let name = node.value;
      if (startIndex > 0) {
        prefix = node.value.substring(0, startIndex);
        name = node.value.substring(startIndex);
      }

      const options: TransformSassItemOptions = {
        name,
        type: isVariable ? "variable" : "function",
      };

      if (removeItem(options)) {
        changed = true;
        addTodo(
          decl,
          `The ${name} ${isVariable ? "variable" : "function"} has been removed.`
        );

        return;
      }

      const renamed = renameItem(options);
      if (renamed) {
        changed = true;
        valueChanged = true;
        name = renamed;
        node.value = prefix + renamed;
      }

      if (node.type !== "function") {
        return;
      }

      const group = name.replace(/-get-var.*/, "");

      let formName: string | unknown;
      let icon: boolean | undefined;
      node.nodes.map((param) => {
        const migration = getThemeMigration({
          name: param.value,
          type: "mixin",
          group,
        });
        const removed = migration?.removed;
        const renamed = migration?.renamed;
        icon ??= migration?.icon;
        formName ??= migration?.form;
        if (removed) {
          changed = true;
          addTodo(decl, `This function removed support for "${removed}"`);
        } else if (migration?.icon) {
          // theme-get-var(text-icon-on-background) -> icon-get-var(color)
          param.value = "color";
        } else if (renamed) {
          changed = true;
          param.value = renamed;
        }
      });

      // theme-get-var(text-icon-on-background) -> icon-get-var(color)
      if (icon) {
        node.value = node.value.replace("theme-", "icon-");
      }

      if (formName) {
        node.value = node.value.replace("form-", `${formName}-`);
      }
    });

    if (valueChanged) {
      decl.value = parsed.toString();
    }
  });
  root.walkAtRules(/forward|use/, (forward) => {
    if (!/react-md.+with\s/.test(forward.params)) {
      return;
    }

    const parser = postcssValueParser(forward.toString());
    const overrides = parser.nodes.find(
      (node): node is FunctionNode =>
        node.type === "function" && node.value === ""
    );
    if (!overrides) {
      return;
    }

    let valueChanged = false;
    const removedVariables = new Set<string>();
    overrides.nodes.forEach((node) => {
      if (node.type !== "word") {
        return;
      }

      const options: TransformSassItemOptions = {
        name: node.value,
        type: "variable",
      };
      if (removeItem(options)) {
        removedVariables.add(node.value);
        return;
      }

      const renamed = renameItem(options);
      if (renamed) {
        valueChanged = true;
        node.value = renamed;
      }
    });

    if (removedVariables.size) {
      changed = true;
      root.insertBefore(
        0,
        createTodoComment(
          `The following variables have been removed: ${[...removedVariables].join(", ")}`
        )
      );
    }

    changed ||= valueChanged;
    if (valueChanged) {
      forward.replaceWith(parser.toString());
    }
  });

  return changed;
}
