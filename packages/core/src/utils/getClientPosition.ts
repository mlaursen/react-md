/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface ClientEventPosition {
  clientX: number;
  clientY: number;
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface ClientTouchEventPosition {
  changedTouches: {
    item(index: number): ClientEventPosition | null;
  };
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface ClientPositionOptions {
  event: ClientEventPosition | ClientTouchEventPosition;
  vertical: boolean;
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export const getClientPosition = (options: ClientPositionOptions): number => {
  const { event, vertical } = options;

  const key = vertical ? "clientY" : "clientX";
  if ("clientX" in event) {
    return event[key];
  }

  // this should pretty much always be defined
  return event.changedTouches.item(0)?.[key] || 0;
};
