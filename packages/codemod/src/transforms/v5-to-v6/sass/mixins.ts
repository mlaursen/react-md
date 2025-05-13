import { type Root } from "postcss";

import { type TransformSassItemOptions } from "../../../utils/types.js";
import { addTodo } from "./addTodo.js";
import { getNextThemeName } from "./getNextThemeName.js";
import { removeItem } from "./removeItem.js";
import { renameItem } from "./renameItem.js";
import { getThemeMigration } from "./themeAPI.js";

export function mixins(root: Root): boolean {
  let changed = false;
  root.walkAtRules(/include/, (node) => {
    const name = node.params.replace(/\(.+$/, "");
    let mixinName = name;
    const options: TransformSassItemOptions = { name, type: "mixin" };

    if (removeItem(options)) {
      changed = true;
      addTodo(
        node,
        "This mixin has been removed and must manually be updated."
      );
    } else {
      const renamed = renameItem(options);
      if (renamed) {
        changed = true;
        mixinName = renamed;
        node.params = node.params.replace(name, renamed);
      }
    }

    if (/-(set|use)-var/.test(mixinName)) {
      const group = mixinName.replace(
        /[\s\S]*?([^\s-]+)-(get|set|use)-var[\s\S]*/m,
        "$1"
      );

      let icon: boolean | undefined;
      let formName: string | undefined;
      let removed = "";
      const params = getNextThemeName({
        index: mixinName.includes("-set-") ? 0 : 1,
        params: node.params,
        rename: (themeName) => {
          const migration = getThemeMigration({
            name: themeName,
            type: "mixin",
            group,
          });
          if (migration?.removed) {
            removed = themeName;
            return themeName;
          }

          icon ??= migration?.icon;
          formName = migration?.form;

          return migration?.renamed || themeName;
        },
      });

      if (removed) {
        changed = true;
        addTodo(node, `This mixin removed support for "${removed}".`);
      } else if (params !== node.params) {
        changed = true;
        node.params = params;
      }

      if (icon) {
        node.params = node.params
          .replace("theme-", "icon-")
          .replace("text-icon-on-background", "color")
          .replace(/color\s*,\s*color/, "color");
      }

      if (formName) {
        node.params = node.params.replace("form-", `${formName}-`);
      }
    }
  });

  return changed;
}
