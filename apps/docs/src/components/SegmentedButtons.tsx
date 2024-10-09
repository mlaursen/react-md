import { type TextTransform } from "@react-md/core/cssUtils";
import { SegmentedButton } from "@react-md/core/segmented-button/SegmentedButton";
import {
  SegmentedButtonContainer,
  type SegmentedButtonContainerProps,
} from "@react-md/core/segmented-button/SegmentedButtonContainer";
import { typography } from "@react-md/core/typography/typographyStyles";
import { type ReactElement, type ReactNode } from "react";

const noop = (): ReactNode => undefined;

export interface SegmentedButtonsProps<V extends string>
  extends Omit<SegmentedButtonContainerProps, "children"> {
  textTransform?: TextTransform;
  icon?: Record<V, ReactNode> | ((item: V) => ReactNode);
  items: readonly V[];
  value: V;
  setValue: (nextValue: V) => void;
}

export function SegmentedButtons<V extends string>(
  props: SegmentedButtonsProps<V>
): ReactElement {
  const {
    items,
    value,
    setValue,
    icon = noop,
    textTransform,
    ...remaining
  } = props;
  const getIcon = typeof icon === "function" ? icon : (item: V) => icon[item];

  return (
    <SegmentedButtonContainer {...remaining}>
      {items.map((item) => (
        <SegmentedButton
          key={item}
          selected={item === value}
          onClick={() => {
            setValue(item);
          }}
          className={typography({ type: null, textTransform })}
          leftAddon={getIcon(item)}
          disableSelectedIcon
        >
          {item}
        </SegmentedButton>
      ))}
    </SegmentedButtonContainer>
  );
}
