import type { Dispatch, ReactElement, SetStateAction } from "react";
import { TempRadio } from "../TempRadio";
import type { IconCategoryState, IconTypeState } from "./useMaterialIcons";

type RadioProps =
  | {
      name: "iconType";
      value: IconTypeState;
      currentValue: IconTypeState;
      setCurrentValue: Dispatch<SetStateAction<IconTypeState>>;
    }
  | {
      name: "iconCategory";
      value: IconCategoryState;
      currentValue: IconCategoryState;
      setCurrentValue: Dispatch<SetStateAction<IconCategoryState>>;
    };

export function Radio(props: RadioProps): ReactElement {
  const { name, currentValue, setCurrentValue, value } = props;
  return (
    <TempRadio
      label={value}
      name={name}
      checked={value === currentValue}
      onChange={() => setCurrentValue(value as "all")}
      value={value}
    />
  );
}
