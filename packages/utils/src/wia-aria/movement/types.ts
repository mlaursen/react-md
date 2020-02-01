/**
 * The type of focus that should be triggered from a keypress.
 */
export type FocusType = "increment" | "decrement" | "first" | "last";

/**
 * A key object that is used to determine what type of behavior to do from a
 * keyboard event.
 */
export interface KeyConfig {
  key: string;
  type: FocusType;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}

/**
 * The currently supported keyboard movement key combinations that increment or
 * decrement within a list. This was extracted from the w3.org website about
 * wia-aria best practices.
 *
 * @see https://www.w3.org/TR/wai-aria-practices/
 */
export enum IncrementMovementKey {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  PageDown = "PageDown",
  PageUp = "PageUp",
  ShiftArrowUp = "Shift+ArrowUp",
  ShiftArrowDown = "Shift+ArrowDown",
  ShiftArrowLeft = "Shift+ArrowLeft",
  ShiftArrowRight = "Shift+ArrowRight",
  AltArrowDown = "Alt+ArrowDown",
  AltArrowUp = "Alt+ArrowUp",
  AltArrowLeft = "Alt+ArrowLeft",
  AltArrowRight = "Alt+ArrowRight",
  AltPageDown = "Alt+PageDown",
  AltPageUp = "Alt+PageUp",
  ControlArrowDown = "Control+ArrowDown",
  ControlArrowUp = "Control+ArrowUp",
}

/**
 * The currently supported keyboard movement key combinations that jump to the
 * start or end of a list.  This was extracted from the w3.org website about
 * wai-aria best practices.
 *
 * @see https://www.w3.org/TR/wai-aria-practices/
 */
export enum JumpMovementKey {
  Home = "Home",
  End = "End",
  AltHome = "Alt+Home",
  AltEnd = "Alt+End",
  ControlHome = "Control+Home",
  ControlEnd = "Control+End",
  ControlShiftHome = "Control+Shift+Home",
  ControlShiftEnd = "Control+Shift+End",
}

export type MovementKey = IncrementMovementKey | JumpMovementKey;

export interface MovementConfig {
  /**
   * Boolean if the keyboard movement should be able to loop around once it has
   * reached the start or end of all the items.
   */
  loopable?: boolean;

  /**
   * Boolean if the movement should also include printable characters search
   * movement.
   */
  searchable?: boolean;

  /**
   * The keys that can trigger a move to the next item. If the `loopable` config
   * is enabled, this will loop to the first item if the last item is currently
   * "focused".
   */
  incrementKeys: IncrementMovementKey[];

  /**
   * The keys that can trigger a move to the previous item. If the `loopable`
   * config is enabled, this will loop to the last item if the first item is
   * currently "focused".
   */
  decrementKeys: IncrementMovementKey[];

  /**
   * The keys that can trigger a move to the first item.
   */
  jumpToFirstKeys: JumpMovementKey[];

  /**
   * The keys that can trigger a move to the last item.
   */
  jumpToLastKeys: JumpMovementKey[];
}
