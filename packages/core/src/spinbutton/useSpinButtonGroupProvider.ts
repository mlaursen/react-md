"use client";

import {
  DEFAULT_LTR_KEYBOARD_MOVEMENT_WITHOUT_JUMP,
  DEFAULT_RTL_KEYBOARD_MOVEMENT_WITHOUT_JUMP,
} from "../movement/constants.js";
import {
  type KeyboardMovementProps,
  type KeyboardMovementProviderImplementation,
  type SimpleKeyboardMovementWrapperOptions,
} from "../movement/types.js";
import { useKeyboardMovementProvider } from "../movement/useKeyboardMovementProvider.js";
import { useDir } from "../typography/WritingDirectionProvider.js";

const SPINBUTTON_ROLE = '[role="spinbutton"]';

/**
 * @internal
 * @since 6.4.0
 */
const getSpinButtonsOnly = (container: HTMLElement): readonly HTMLElement[] => [
  ...container.querySelectorAll<HTMLElement>(SPINBUTTON_ROLE),
];

/**
 * @since 6.4.0
 */
export interface SpinButtonGroupProviderOptions<
  E extends HTMLElement = HTMLElement,
> extends SimpleKeyboardMovementWrapperOptions<E> {
  /**
   * Set this to `true` to update the container's `onClick` handler to move
   * focus to the first spinbutton that does not have a value or the first
   * spinbutton in the group so that focus is always moved to the spin buttons.
   *
   * @defaultValue `false`
   */
  forceFocusWithin?: boolean;
}

export interface ProvidedSpinButtonGroupProps<
  E extends HTMLElement = HTMLElement,
> extends KeyboardMovementProps<E> {
  role: "group";
}

/**
 * @since 6.4.0
 */
export interface SpinButtonGroupProviderImplementation<
  E extends HTMLElement = HTMLElement,
> extends KeyboardMovementProviderImplementation<E> {
  movementProps: Readonly<ProvidedSpinButtonGroupProps<E>>;
}

/**
 * @since 6.4.0
 */
export function useSpinButtonGroupProvider<E extends HTMLElement = HTMLElement>(
  options: SpinButtonGroupProviderOptions<E> = {}
): SpinButtonGroupProviderImplementation<E> {
  const { disabled, forceFocusWithin } = options;

  const isRTL = useDir().dir === "rtl";
  const movementKeys = isRTL
    ? DEFAULT_RTL_KEYBOARD_MOVEMENT_WITHOUT_JUMP
    : DEFAULT_LTR_KEYBOARD_MOVEMENT_WITHOUT_JUMP;

  const { movementProps, ...remaining } = useKeyboardMovementProvider({
    ...options,
    ...movementKeys,
    loopable: false,
    trackTabKeys: true,
    getFocusableElements: getSpinButtonsOnly,
  });

  return {
    ...remaining,
    movementProps: {
      ...movementProps,
      role: "group",
      onClick: (event) => {
        movementProps.onClick(event);

        const { target, currentTarget } = event;
        if (
          disabled ||
          !forceFocusWithin ||
          !(target instanceof HTMLElement) ||
          target.closest(SPINBUTTON_ROLE)
        ) {
          return;
        }

        const buttons = [...currentTarget.querySelectorAll(SPINBUTTON_ROLE)];
        const i = buttons.findIndex((button) => !button.ariaValueNow);
        remaining.movementContext.updateFocusIndex({
          index: Math.max(0, i),
          force: true,
        });
      },
    },
  };
}
