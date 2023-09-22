import {
  Box,
  SegmentedButton,
  SegmentedButtonContainer,
  Typography,
  typography,
  type TextTransform,
} from "@react-md/core";
import { type ReactElement, type ReactNode } from "react";

const noop = (): ReactNode => undefined;

export interface SegmentedButtonGroupProps<V extends string> {
  label: ReactNode;
  transform?: TextTransform;

  icon?: Record<V, ReactNode> | ((item: V) => ReactNode);
  items: readonly V[];
  value: V;
  setValue(nextValue: V): void;
}

export function SegmentedButtonGroup<V extends string>(
  props: SegmentedButtonGroupProps<V>
): ReactElement {
  const { label, items, value, setValue, icon = noop, transform } = props;
  const getIcon = typeof icon === "function" ? icon : (item: V) => icon[item];

  return (
    <Box stacked fullWidth disablePadding align="stretch">
      <Typography margin="none">{label}</Typography>
      <SegmentedButtonContainer>
        {items.map((item) => (
          <SegmentedButton
            key={item}
            selected={item === value}
            onClick={() => {
              setValue(item);
            }}
            className={typography({ type: null, transform })}
            leftAddon={getIcon(item)}
            disableSelectedIcon
          >
            {item}
          </SegmentedButton>
        ))}
      </SegmentedButtonContainer>
    </Box>
  );
}
