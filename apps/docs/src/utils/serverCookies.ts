import type { cookies } from "next/headers.js";
import "server-only";

interface GetCookieOptions<V extends string> {
  name: string;
  isValid(value: string): value is V;
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
