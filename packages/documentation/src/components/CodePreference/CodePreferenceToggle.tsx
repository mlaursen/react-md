import type { ReactElement } from "react";
import type { AppBarActionProps } from "@react-md/app-bar";
import type { MenuItemProps } from "@react-md/menu";
import { MenuItem } from "@react-md/menu";

import AppBarAction from "components/AppBarAction";
import JavascriptSVGIcon from "icons/JavascriptSVGIcon";
import TypescriptSVGIcon from "icons/TypescriptSVGIcon";

import { useCodePreference } from "./CodePreferenceProvider";

type CodePreferenceActionProps = Omit<
  AppBarActionProps,
  "aria-pressed" | "buttonType" | "children"
> & { as: "action" };

type CodePreferenceMenuProps = MenuItemProps & { as: "menuitem" };

type CodePreferenceProps = CodePreferenceActionProps | CodePreferenceMenuProps;

const PREFIX = "code-pref-toggle";

export function CodePreferenceToggle({
  id = "",
  as,
  ...remaining
}: CodePreferenceProps): ReactElement {
  id = id ? `-${id}` : "";
  const { pref, toggle } = useCodePreference();
  const isJs = pref === "js";
  const name = isJs ? "Javascript" : "TypeScript";
  const icon = isJs ? <JavascriptSVGIcon /> : <TypescriptSVGIcon />;
  if (as === "action") {
    const { onClick, ...props } = remaining as CodePreferenceActionProps;
    const tooltip = `Use ${name} in code examples and generated sandboxes`;
    return (
      <AppBarAction
        {...props}
        onClick={(event) => {
          if (onClick) {
            onClick(event);
          }

          toggle();
        }}
        id={`${PREFIX}${id}`}
        aria-label="Preferred Coding Language"
        aria-pressed={isJs}
        buttonType="icon"
        tooltip={tooltip}
      >
        {icon}
      </AppBarAction>
    );
  }
  const { onClick, ...props } = remaining as CodePreferenceMenuProps;

  return (
    <MenuItem
      {...props}
      id={`${PREFIX}${id}`}
      leftAddon={icon}
      onClick={(event) => {
        if (onClick) {
          onClick(event);
        }

        toggle();
      }}
      primaryText="Preferred Coding Language"
      secondaryText={`Current language: ${name}`}
    />
  );
}
