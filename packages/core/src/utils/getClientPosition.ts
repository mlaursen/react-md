/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface ClientPositionMouseEvent {
  clientX: number;
  clientY: number;
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface ClientPositionTouchEvent {
  changedTouches: {
    [index: number]: ClientPositionMouseEvent;
  };
}

export type ClientPositionEvent =
  | ClientPositionMouseEvent
  | ClientPositionTouchEvent;

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface ClientPositionOptions {
  event: ClientPositionEvent;
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
  return event.changedTouches[0]?.[key] || 0;
};
