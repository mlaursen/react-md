import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import { AppBarAction } from "@react-md/app-bar";
import appBarVariables from "@react-md/app-bar/dist/scssVariables";
import dividerVariables from "@react-md/divider/dist/scssVariables";
import { LightbulbOutlineSVGIcon } from "@react-md/material-icons";
import statesVariables from "@react-md/states/dist/scssVariables";
import { UpdateVariables } from "@react-md/theme";
import themeVariables from "@react-md/theme/dist/scssVariables";
import { useToggle } from "@react-md/utils";

import LightbulbSVGIcon from "icons/LightbulbSVGIcon";
import * as storage from "utils/storage";

import "./toggle-theme.scss";
import { useStatesConfigContext } from "@react-md/states";

let lastTheme = "";
const lightVariables = Object.keys({
  "light-app-bar-start": "",
  ...appBarVariables["rmd-app-bar-theme-values"],
  "light-states-start": "",
  ...statesVariables["rmd-states-theme-values"],
  "light-divider-start": "",
  ...dividerVariables["rmd-divider-theme-values"],
  "light-theme-start": "",
  ...themeVariables["rmd-theme-values"],
})
  .filter(name => name.includes("light"))
  .reduce((collected, name) => {
    if (name.endsWith("-start")) {
      lastTheme = name.replace(/^light-/, "").replace(/-start$/, "");
      return collected;
    }

    const prefix = `rmd-${lastTheme}`;
    let key = name.replace(/^light-/, "").replace(/light$/, "background");
    if (lastTheme === "app-bar") {
      key = key.replace(/-light/, "");
    }

    return {
      ...collected,
      [`${prefix}-${key}`]: `var(--${prefix}-${name})`,
    };
  }, {});

const LIGHT_THEMES = {
  ...lightVariables,
  "code-bg": "var(--code-bg-light)",
  "strong-color": "var(--strong-color)",
};

const THEME_TRANSITION_DURATION = 150;

function useThemeTransition(isLight: boolean) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const root = document.documentElement as HTMLElement;
    root.classList.add("toggle-theme-transition");
    // force dom repaint
    root.scrollTop;

    const timeout = window.setTimeout(() => {
      root.classList.remove("toggle-theme-transition");
    }, THEME_TRANSITION_DURATION);

    return () => {
      window.clearTimeout(timeout);
      root.classList.remove("toggle-theme-transition");
    };
  }, [isLight]);
}

function useThemeStorage(isLight: boolean) {
  useEffect(() => {
    storage.setItem("isLight", isLight.toString());
  }, [isLight]);
}

function useThemeVariables(isLight: boolean) {
  return useMemo(
    () =>
      Object.entries(LIGHT_THEMES).map(([name, value]) => ({
        name,
        value: isLight ? value : "",
      })),
    [isLight]
  );
}

const ToggleTheme: FunctionComponent = () => {
  const [isLight, setLightTheme] = useState(
    () => storage.getItem("isLight") === "true"
  );

  useThemeTransition(isLight);
  useThemeStorage(isLight);
  const { toggled, enable, disable } = useToggle();
  const variables = useThemeVariables(isLight);
  let icon: ReactNode = <LightbulbOutlineSVGIcon />;
  if (toggled !== isLight) {
    icon = <LightbulbSVGIcon />;
  }

  const isMouseMode = useStatesConfigContext().mode === "mouse";

  return (
    <UpdateVariables variables={variables}>
      <AppBarAction
        id="toggle-theme"
        first
        onClick={() => setLightTheme(prevDark => !prevDark)}
        onMouseEnter={isMouseMode ? enable : undefined}
        onMouseLeave={isMouseMode ? disable : undefined}
        className={cn("toggle-theme", {
          "toggle-theme--on": isLight,
          "toggle-theme--off": !isLight,
        })}
      >
        {icon}
      </AppBarAction>
    </UpdateVariables>
  );
};

export default ToggleTheme;
