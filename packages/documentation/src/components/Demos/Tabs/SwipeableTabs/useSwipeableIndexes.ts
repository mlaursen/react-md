import { useCallback, useReducer } from "react";
import { EventData, SwipeableHandlers, useSwipeable } from "react-swipeable";

interface State {
  /**
   * Boolean if the user is currently swiping. This is used to disable transitions
   * as needed and apply the `transform` to the panels.
   */
  swiping: boolean;

  /**
   * The current swipe distance. When the user is not swiping, this will be the
   * empty string.
   */
  distance: string;

  /**
   * The current active index for the tabs. This is now controlled instead of allowing
   * the TabsManager to handle it all since we'll need to update the active index once
   * the user completes a swipe.
   */
  activeIndex: number;
}

const CHANGE = "CHANGE";
const MOVE = "MOVE";
const JUMP = "JUMP";

interface ChangeAction {
  type: typeof CHANGE;
  activeIndex: number;
}

interface MoveAction {
  type: typeof MOVE;
  data: EventData;
  tabs: number;
}

interface JumpAction {
  type: typeof JUMP;
  data: EventData;
  tabs: number;
}

type Action = ChangeAction | MoveAction | JumpAction;

/**
 * This does a shallow compare of the state objects and only returns the nextState
 * when one of the values are different. This prevents unneeded re-renders since
 * different state objects will always be shallow-different.
 */
const update = (state: State, nextState: State): State => {
  if (
    (Object.keys(state) as (keyof State)[]).some(
      key => state[key] !== nextState[key]
    )
  ) {
    return nextState;
  }

  return state;
};

/**
 * This is called whenever a swipe has been completed to update the active
 * index to the next slide.
 *
 * You'll probably want to update this to only update the slide if a specific
 * relative distance has been exceeded. Right now it'll be fired even if it's
 * only 10px.
 */
function jump(state: State, data: EventData, tabs: number): State {
  const { activeIndex, swiping } = state;
  const incrementor = data.dir === "Left" ? 1 : -1;
  const nextIndex = Math.max(0, Math.min(tabs, activeIndex + incrementor));

  return update(state, {
    swiping,
    distance: "",
    activeIndex: nextIndex,
  });
}

/**
 * This is fired whenever the user is swiping the panels and is used to update
 * the distance string used in a `transform: translateX(${diustance})` style.
 *
 * This should eventually be updated to ensure that the distance is "normalized"
 * based on the panel width, but it's too much work for an example demo.
 */
function move(state: State, data: EventData, tabs: number): State {
  let { deltaX } = data;
  if (state.activeIndex === 0) {
    deltaX = Math.max(-30, deltaX);
  } else if (state.activeIndex === tabs) {
    deltaX = Math.min(30, deltaX);
  }

  const distance = `${-deltaX}px`;

  return update(state, {
    ...state,
    distance,
    swiping: true,
  });
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case CHANGE:
      return update(state, {
        activeIndex: action.activeIndex,
        distance: "",
        swiping: false,
      });
    case JUMP:
      return jump(state, action.data, action.tabs);
    case MOVE:
      return move(state, action.data, action.tabs);
    default:
      return state;
  }
}

interface ReturnValue extends State {
  onActiveIndexChange: (activeIndex: number) => void;
  handlers: SwipeableHandlers;
}

export default function useSwipeableIndexes(tabs: number): ReturnValue {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, {
    activeIndex: 0,
    distance: "",
    swiping: false,
  });

  const move = useCallback(
    (data: EventData) => {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
      }
      dispatch({ type: MOVE, data, tabs });
    },
    [tabs]
  );

  const jump = useCallback(
    (data: EventData) => {
      dispatch({ type: JUMP, data, tabs });
    },
    [tabs]
  );

  const change = useCallback((activeIndex: number) => {
    dispatch({ type: CHANGE, activeIndex });
  }, []);

  const handlers = useSwipeable({
    // this is just for demo purposes, and you probably don't want mouse sliding.
    trackMouse: true,
    onSwiping: move,
    onSwipedLeft: jump,
    onSwipedRight: jump,
  });

  return {
    ...state,
    handlers,
    onActiveIndexChange: change,
  };
}
