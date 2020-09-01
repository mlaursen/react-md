import React, {
  FC,
  useRef,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import {
  AppBarTitle as RMDAppBarTitle,
  AppBarTitleProps,
} from "@react-md/app-bar";
import { Tooltipped } from "@react-md/tooltip";
import { useResizeObserver } from "@react-md/utils";
import createIdGenerator from "utils/createIdGenerator";

const hackyIds = createIdGenerator("dynamic-tooltips");

/**
 * This component is a wrapper for the AppBarTitle component from @react-md/app-bar
 * that will automatically update the title to show a tooltip if the title becomes
 * truncated.
 *
 * This is pretty hacky right so it isn't part of the main lib yet, but a better
 * sultion to "auto tooltip" things might be added one day.
 */
const AppBarTitle: FC<AppBarTitleProps> = ({
  id: propId,
  children,
  ...props
}) => {
  const [tooltip, setTooltip] = useState<ReactNode>(null);
  const ref = useRef<HTMLHeadingElement | null>(null);
  const updateTooltip = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const isTruncated = ref.current.offsetWidth < ref.current.scrollWidth;
    if (isTruncated && !tooltip) {
      setTooltip(children);
    } else if (!isTruncated && tooltip) {
      setTooltip(null);
    }
  }, [tooltip, ref, children]);
  const [, refHandler] = useResizeObserver(updateTooltip, {
    ref,
    disableHeight: true,
  });

  const id = useMemo(() => {
    if (propId) {
      return propId;
    }

    return hackyIds();
  }, [propId]);

  return (
    <Tooltipped id={id} tooltip={tooltip}>
      <RMDAppBarTitle
        {...props}
        ref={refHandler}
        tabIndex={tooltip ? 0 : undefined}
      >
        {children}
      </RMDAppBarTitle>
    </Tooltipped>
  );
};

export default AppBarTitle;
