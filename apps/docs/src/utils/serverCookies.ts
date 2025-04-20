import { DEFAULT_LIGHT_THEME } from "@react-md/core/theme/constants";
import { type ConfigurableThemeColors } from "@react-md/core/theme/types";
import { assertString } from "docs-generator/utils/assertions";
import { type cookies } from "next/headers.js";
import "server-only";

import { CUSTOM_THEME_KEY } from "@/constants/cookies.js";

import { isValidColor } from "./theme.js";

interface GetCookieOptions<V extends string> {
  name: string;
  isValid: (value: string) => value is V;
  defaultValue: V;
  instance: ReturnType<typeof cookies>;
}

export function getCookie<V extends string>(options: GetCookieOptions<V>): V {
  const { name, defaultValue, isValid, instance } = options;
  const value = instance.get(name)?.value;
  if (!value || !isValid(value)) {
    return defaultValue;
  }

  return value;
}

export function getThemeCookie(
  instance: ReturnType<typeof cookies>
): Partial<ConfigurableThemeColors> | undefined {
  const value = instance.get(CUSTOM_THEME_KEY)?.value ?? "";
  if (!value) {
    return;
  }

  try {
    const parsed = JSON.parse(value);
    Object.entries(parsed).forEach(([key, value]) => {
      assertString(value);
      if (!(key in DEFAULT_LIGHT_THEME) || !isValidColor(value)) {
        throw new Error(`${key} or ${value} is invalid`);
      }
    });

    return parsed;
  } catch {
    return;
  }
}
