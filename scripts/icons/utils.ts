import { pascalCase } from "../utils/strings.js";
import type { IconType } from "./types";

/**
 * This is just a sanity check to make sure that material-design-icons repo
 * hasn't added more icon types or changed the structure again.
 */
export function getIconType(type: string): IconType {
  switch (type.replace("materialicons", "")) {
    case "":
      return "filled";
    case "outlined":
      return "outlined";
    case "round":
      return "rounded";
    case "twotone":
      return "twotone";
    case "sharp":
      return "sharp";
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}

/**
 * Converts the `snake_case_name` into a `PascalCaseName` and also ensuring that
 * the name is a valid Javascript variable. This mostly means that if the
 * `snake_case_name` started with a number, the name will get swapped so it
 * starts with a letter instead.
 *
 * Examples:
 * - `3d_rotation` -> `Rotation3D`
 * - `accessibility` -> `Accessibility`
 * - `plus_one` -> `PlusOne`
 */
export function getComponentName(snakeCaseName: string): string {
  if (/^[0-9]/.test(snakeCaseName)) {
    const [first, second, ...remaining] = snakeCaseName.split("_");
    const suffix = remaining.length ? `_${remaining.join("_")}` : "";
    snakeCaseName = `${second}_${first}${suffix}`;
  }

  return pascalCase(snakeCaseName);
}
