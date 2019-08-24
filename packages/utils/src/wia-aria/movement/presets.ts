import { MovementConfig, IncrementMovementKey, JumpMovementKey } from "./types";

/**
 * A keyboard movement configuration preset for handling vertical menu
 * movements.
 */
export const VERTICAL_MENU: MovementConfig = {
  loopable: true,
  searchable: true,
  incrementKeys: [IncrementMovementKey.ArrowDown],
  decrementKeys: [IncrementMovementKey.ArrowUp],
  jumpToFirstKeys: [JumpMovementKey.Home],
  jumpToLastKeys: [JumpMovementKey.End],
};

/**
 * A keyboard movement configuration preset for handling horizontal menu
 * movements.
 */
export const HORIZONTAL_MENU: MovementConfig = {
  ...VERTICAL_MENU,
  incrementKeys: [IncrementMovementKey.ArrowLeft],
  decrementKeys: [IncrementMovementKey.ArrowRight],
};

/**
 * A keyboard movement configuration preset for handling vertical listbox
 * movements.
 */
export const VERTICAL_LISTBOX: MovementConfig = {
  ...VERTICAL_MENU,
  loopable: false,
};

/**
 * A keyboard movement configuration preset for handling horizontal listbox
 * movements.
 */
export const HORIZONTAL_LISTBOX: MovementConfig = {
  ...HORIZONTAL_MENU,
  loopable: false,
};
