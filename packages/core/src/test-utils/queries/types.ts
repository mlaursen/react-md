import {
  type BoundFunctions,
  type ByRoleOptions,
  type queries,
} from "@testing-library/dom";

/**
 * @since 6.0.0
 */
export interface GetPartsByRoleOptions extends ByRoleOptions {
  /** @defaultValue `screen` */
  container?: BoundFunctions<typeof queries>;
}
