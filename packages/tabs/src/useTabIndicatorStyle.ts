import {
  createContext,
  MutableRefObject,
  Ref,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ItemRefList, useResizeObserver } from "@react-md/utils";

interface Options {
  style: React.CSSProperties | undefined;
  ref?: Ref<HTMLDivElement | null>;
  itemRefs: ItemRefList;
  totalTabs: number;
  activeIndex: number;
  align: "left" | "center" | "right";
}

const TAB_WIDTH_VAR = "--rmd-tab-width";
const TAB_OFFSET_VAR = "--rmd-tab-offset";

interface CSSVariables {
  [TAB_WIDTH_VAR]: string;
  [TAB_OFFSET_VAR]: string;
}

type CSSProperties = React.CSSProperties & CSSVariables;
type UpdateIndicatorStyles = () => void;

type MergedTabRef = (instance: HTMLDivElement | null) => void;
type ReturnValue = [
  CSSProperties,
  MergedTabRef,
  MutableRefObject<HTMLDivElement | null>,
  UpdateIndicatorStyles
];

const getActiveTab = (
  itemRefs: ItemRefList,
  activeIndex: number
): HTMLElement | null => {
  return (itemRefs[activeIndex] && itemRefs[activeIndex].current) || null;
};

/**
 * @remarks \@since 2.3.0
 * @internal
 */
const context = createContext<UpdateIndicatorStyles>(() => {
  // do nothing
});

/**
 * @remarks \@since 2.3.0
 * @internal
 */
export const { Provider: UpdateIndicatorStylesProvider } = context;

/**
 * @remarks \@since 2.3.0
 * @internal
 */
export function useUpdateIndicatorStyles(): UpdateIndicatorStyles {
  return useContext(context);
}

/**
 * This hook will merge the provided style object along with the required css
 * variables for the active tab underline moving to the correct location. The
 * indicator will be updated to be the same width as the tab along with offset
 * by all the tabs' sizes.
 *
 * @internal
 */
export function useTabIndicatorStyle({
  style,
  ref: propRef,
  align,
  itemRefs,
  totalTabs,
  activeIndex,
}: Options): ReturnValue {
  const [cssVars, setCSSVars] = useState(() => {
    const tabWidth = `${100 / totalTabs}%`;
    return {
      [TAB_WIDTH_VAR]: tabWidth,
      [TAB_OFFSET_VAR]: `calc(${activeIndex} * ${tabWidth})`,
    };
  });
  const prevCSSVars = useRef(cssVars);
  const updateCSSVars = useCallback(
    (itemRefs: ItemRefList, activeIndex: number) => {
      const activeTab = getActiveTab(itemRefs, activeIndex);
      if (!activeTab) {
        return;
      }

      const nextCSSVars = {
        [TAB_WIDTH_VAR]: `${activeTab.offsetWidth}px`,
        [TAB_OFFSET_VAR]: `${activeTab.offsetLeft}px`,
      };
      const cssVars = prevCSSVars.current;
      if (
        cssVars[TAB_WIDTH_VAR] !== nextCSSVars[TAB_WIDTH_VAR] ||
        cssVars[TAB_OFFSET_VAR] !== nextCSSVars[TAB_OFFSET_VAR]
      ) {
        prevCSSVars.current = nextCSSVars;
        setCSSVars(nextCSSVars);
      }
    },
    []
  );

  useEffect(() => {
    updateCSSVars(itemRefs, activeIndex);

    // has to also be triggered for align changes since the indicator offset
    // will be incorrect for that.
  }, [activeIndex, itemRefs, updateCSSVars, align]);

  const updateStyles = useCallback(() => {
    updateCSSVars(itemRefs, activeIndex);
  }, [itemRefs, activeIndex, updateCSSVars]);

  // whenever the tabs container element is resized, it _probably_ means
  // that the tabs will be resized or moved. this means the indicator will
  // be in the wrong place so we need to fix it here.
  const [tabsRef, tabsRefHandler] = useResizeObserver(updateStyles, {
    ref: propRef,
  });

  const mergedStyle = useMemo(
    () => ({ ...style, ...cssVars }),
    [style, cssVars]
  );
  return [mergedStyle, tabsRefHandler, tabsRef, updateStyles];
}
