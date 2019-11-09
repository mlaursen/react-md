import {
  useState,
  Children,
  isValidElement,
  useEffect,
  ReactNode,
  useCallback,
  MutableRefObject,
  MouseEventHandler,
  KeyboardEventHandler,
  useMemo,
} from "react";
import { useKeyboardMovement, MovementPresets } from "@react-md/utils";

interface Options {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
  onKeyDown: KeyboardEventHandler<HTMLDivElement> | undefined;
  horizontal: boolean;
  activeIndex: number;
  disableLazyMode: boolean;
  onActiveIndexChange: (activeIndex: number) => void;
}

interface ReturnValue {
  tabs: ReactNode[];
  itemRefs: MutableRefObject<HTMLElement | null>[];
  handleClick: MouseEventHandler<HTMLDivElement>;
  handleKeyDown: KeyboardEventHandler<HTMLDivElement>;
}

/**
 * @private
 */
export default function useTabsMovement({
  children,
  activeIndex,
  horizontal,
  onClick,
  onKeyDown,
  disableLazyMode,
  onActiveIndexChange,
}: Options): ReturnValue {
  // first filter out all "nulled" or falsish elements since it's possible to do:
  // {!thing && <Tab />}
  const tabs = useMemo(() => Children.toArray(children).filter(Boolean), [
    children,
  ]);
  // now filter out any other invalid elements (text nodes for some reason) and
  // disabled tabs since they shouldn't be keyboard focusable
  const visibleTabs = useMemo(
    () => tabs.filter(child => isValidElement(child) && !child.props.disabled),
    [tabs]
  );

  const [focusedIndex, setFocusedIndex] = useState(activeIndex);
  useEffect(() => {
    setFocusedIndex(activeIndex);
  }, [activeIndex]);
  const [itemRefs, handleKeyDown] = useKeyboardMovement({
    ...(horizontal
      ? MovementPresets.HORIZONTAL_TABS
      : MovementPresets.VERTICAL_TABS),
    onKeyDown,
    focusedIndex,
    items: visibleTabs,
    onChange({ index }) {
      if (index === -1) {
        return;
      }

      if (disableLazyMode) {
        onActiveIndexChange(index);
      }

      const item = itemRefs[index] && itemRefs[index].current;
      if (item) {
        item.focus();
      }

      setFocusedIndex(index);
    },
  });

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) {
        onClick(event);
      }

      const target =
        event.target && (event.target as HTMLElement).closest("button");
      if (!target) {
        return;
      }

      const index = itemRefs.findIndex(ref => ref.current === target);
      if (activeIndex !== index) {
        onActiveIndexChange(index);
      }
    },
    [activeIndex, itemRefs, onActiveIndexChange, onClick]
  );

  return {
    tabs,
    itemRefs,
    handleClick,
    handleKeyDown,
  };
}
