import { NativeTimeField } from "@react-md/core/datetime/NativeTimeField";
import { type ReactElement, useId } from "react";

export default function SuggestedTimesExample(): ReactElement {
  const datalistId = useId();
  return (
    <>
      <NativeTimeField label="Time" name="time" list={datalistId} />
      <datalist id={datalistId}>
        <option value="09:00" />
        <option value="12:30" />
        <option value="15:00" />
        <option value="18:45" />
      </datalist>
    </>
  );
}
