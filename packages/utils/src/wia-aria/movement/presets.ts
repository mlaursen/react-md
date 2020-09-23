import { IncrementMovementKey, JumpMovementKey, MovementConfig } from "./types";

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
  incrementKeys: [IncrementMovementKey.ArrowRight],
  decrementKeys: [IncrementMovementKey.ArrowLeft],
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

/**
 * A keyboard movement configuration preset for handling vertical combobox
 * movements.
 */
export const VERTICAL_COMBOBOX: MovementConfig = {
  incrementKeys: [IncrementMovementKey.ArrowDown],
  decrementKeys: [IncrementMovementKey.ArrowUp],
  // don't want to be able to jump since home and end should do default behavior
  // in text field
  jumpToFirstKeys: [],
  jumpToLastKeys: [],
  searchable: false,
};

/**
 * A keyboard movement configuration preset for handling horizontal combobox
 * movements.
 */
export const HORIZONTAL_COMBOBOX: MovementConfig = {
  incrementKeys: [IncrementMovementKey.ArrowRight],
  decrementKeys: [IncrementMovementKey.ArrowLeft],
  // don't want to be able to jump since home and end should do default behavior
  // in text field
  jumpToFirstKeys: [],
  jumpToLastKeys: [],
  searchable: false,
};

export const VERTICAL_TREE: MovementConfig = {
  incrementKeys: [IncrementMovementKey.ArrowDown],
  decrementKeys: [IncrementMovementKey.ArrowUp],
  jumpToFirstKeys: [JumpMovementKey.Home, JumpMovementKey.ControlShiftHome],
  jumpToLastKeys: [JumpMovementKey.End, JumpMovementKey.ControlShiftEnd],
  loopable: true,
  searchable: true,
};

export const HORIZONTAL_TREE: MovementConfig = {
  incrementKeys: [IncrementMovementKey.ArrowRight],
  decrementKeys: [IncrementMovementKey.ArrowLeft],
  jumpToFirstKeys: [JumpMovementKey.Home, JumpMovementKey.ControlShiftHome],
  jumpToLastKeys: [JumpMovementKey.End, JumpMovementKey.ControlShiftEnd],
  loopable: true,
  searchable: true,
};

export const HORIZONTAL_TABS: MovementConfig = {
  incrementKeys: [IncrementMovementKey.ArrowRight],
  decrementKeys: [IncrementMovementKey.ArrowLeft],
  jumpToFirstKeys: [JumpMovementKey.Home],
  jumpToLastKeys: [JumpMovementKey.End],
  loopable: true,
  searchable: false,
};

export const VERTICAL_TABS: MovementConfig = {
  incrementKeys: [IncrementMovementKey.ArrowDown],
  decrementKeys: [IncrementMovementKey.ArrowUp],
  jumpToFirstKeys: [JumpMovementKey.Home],
  jumpToLastKeys: [JumpMovementKey.End],
  loopable: true,
  searchable: false,
};
