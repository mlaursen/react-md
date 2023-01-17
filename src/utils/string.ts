import lodash from "lodash";

export const pascalCase = (s: string): string =>
  lodash.upperFirst(lodash.camelCase(s));

export const toTitleCase = (
  s: string,
  joinWith = " ",
  capitals = false
): string => {
  return s
    .split(capitals ? /(?=[A-Z])/ : "-")
    .map((part) => {
      if (/^((v\d+)|(to))$/.test(part)) {
        return part;
      }

      if (/^api$/i.test(part)) {
        return "API";
      }

      if (/^cdn$/i.test(part)) {
        return "CDN";
      }

      return lodash.upperFirst(part);
    })
    .join(joinWith);
};

export const toLinkableId = (title: string): string =>
  title
    .replace(/\/|\\|\[|]|-/g, "")
    .replace(/SCSS/g, "scss ")
    .replace(/CSS/g, "css ")
    .replace(/API/g, "api")
    .replace(/\s+/g, " ")
    .trim()
    .split(/\s|(?=[A-Z])/)
    .join("-")
    .toLowerCase();
