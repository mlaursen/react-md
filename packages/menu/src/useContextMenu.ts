import {
  Dispatch,
  Ref,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";
import { SCALE_Y_CLASSNAMES } from "@react-md/transition";
import {
  containsElement,
  InitialCoords,
  PositionAnchor,
  TOP_INNER_LEFT_ANCHOR,
  useEnsuredRef,
} from "@react-md/utils";

import { MenuProps } from "./Menu";

type ProvidedPropNames =
  | "id"
  | "anchor"
  | "visible"
  | "classNames"
  | "positionOptions"
  | "onRequestClose"
  | "disableControlClickOkay";

export interface ProvidedContextMenuProps
  extends Required<Pick<MenuProps, ProvidedPropNames>> {
  /**
   * A ref that must be provided to the `Menu` component that is acting as a
   * context menu if you want to allow the native context menus within this
   * custom context menu.
   *
   * If this is never provided to the `Menu` component, right clicking (to
   * inspect an element for example) will close this context menu.
   */
  ref: (instance: HTMLDivElement | null) => void;
}

type VisibilityDispatcher = Dispatch<SetStateAction<boolean>>;

type ReturnValue<CE extends HTMLElement> = [
  ProvidedContextMenuProps,
  React.MouseEventHandler<CE>,
  VisibilityDispatcher
];

const DEFAULT_CONTEXT_MENU_ID = "context-menu";

interface Options {
  /**
   * The id to use for the context menu. This defaults to `context-menu` since
   * there can usually only be one context menu visible at a time.
   */
  id?: string;

  /**
   * An optional ref that should be merged with the returned ref.
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * The anchor to use for context menus.
   *
   * Defaults to `inner-left` and `top` to mimic native context menus.
   */
  anchor?: PositionAnchor;

  /**
   * The CSS classNames to use for the context menu animation. This defaults to
   * a vertical scaling transition instead of the default "from-point-scaling"
   * transition.
   */
  classNames?: CSSTransitionClassNames;

  /**
   * When a context menu becomes visible, the native functionality is to also
   * highlight any text below the cursor when possible. Since this is a custom
   * context menu, this is normally not desired behavior so this hook will
   * automatically deselect this text. If the text selection behavior is
   * desired, this property can be enabled to keep text selected.
   */
  disableDeselect?: boolean;
}

export function useContextMenu<CE extends HTMLElement>({
  id = DEFAULT_CONTEXT_MENU_ID,
  ref: propRef,
  anchor = TOP_INNER_LEFT_ANCHOR,
  classNames = SCALE_Y_CLASSNAMES,
  disableDeselect = false,
}: Options = {}): ReturnValue<CE> {
  const [visible, setVisible] = useState(false);
  const onRequestClose = useCallback(() => {
    setVisible(false);
  }, []);

  const [coords, setCoords] = useState<InitialCoords>({});
  const onContextMenu = useCallback(
    (event: React.MouseEvent<CE>) => {
      event.preventDefault();
      event.stopPropagation();
      const selection = window.getSelection();
      if (selection && !disableDeselect) {
        selection.empty();
      }

      setVisible(true);
      if (event.button === 0 && event.buttons === 0) {
        setCoords({});
        return;
      }

      setCoords({ initialX: event.clientX, initialY: event.clientY });
    },
    [disableDeselect]
  );

  const [ref, refHandler] = useEnsuredRef(propRef);
  useEffect(() => {
    if (!visible) {
      return;
    }

    const hide = (event: MouseEvent): void => {
      const target = event.target as HTMLElement | null;
      if (!containsElement(ref, target)) {
        onRequestClose();
      }
    };
    window.addEventListener("contextmenu", hide, true);

    return () => {
      window.removeEventListener("contextmenu", hide, true);
    };
  }, [onRequestClose, visible, ref]);

  const menuProps: ProvidedContextMenuProps = {
    id,
    ref: refHandler,
    anchor,
    visible,
    classNames,
    onRequestClose,
    positionOptions: coords,
    disableControlClickOkay: true,
  };

  return [menuProps, onContextMenu, setVisible];
}
