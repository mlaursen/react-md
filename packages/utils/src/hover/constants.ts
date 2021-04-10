/**
 * The amount of time a user must hover an element before the temporary element
 * becomes visible.
 *
 * @remarks \@since 2.8.0
 */
export const DEFAULT_HOVER_MODE_VISIBLE_IN_TIME = 1000;

/**
 * The amount of time the user must no longer hover any element attached to the
 * {@link HoverModeProvider} to disable the hover mode.
 *
 * @remarks \@since 2.8.0
 */
export const DEFAULT_HOVER_MODE_DEACTIVATION_TIME = 1000;

/**
 * The amount of time the user must not hover any element attached to the same
 * instance of the {@link useHoverMode} hook when the using the sticky mode.
 *
 * @remarks \@since 2.8.0
 */
export const DEFAULT_HOVER_MODE_STICKY_EXIT_TIME = 300;
