import type { ParsedUrlQuery } from "querystring";

type QueryParamterValue = ParsedUrlQuery[string];

export const qsToString = (q: QueryParamterValue): string => {
  if (!q) {
    return "";
  }

  if (Array.isArray(q)) {
    return q[0] || "";
  }

  return q;
};

export const qsToInt = (q: QueryParamterValue, fallback = 0): number => {
  const value = qsToString(q);
  const asNumber = parseInt(value, 10);

  return Number.isNaN(asNumber) ? fallback : asNumber;
};

export const qsToBoolean = (q: QueryParamterValue): boolean =>
  typeof q !== "undefined";
