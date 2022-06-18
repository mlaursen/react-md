import type { InputHTMLAttributes, ReactElement, ReactNode } from "react";

export interface TempRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
}

export function TempRadio(props: TempRadioProps): ReactElement {
  const { label, ...remaining } = props;
  return (
    <label>
      {label}
      <input {...remaining} type="radio" />
    </label>
  );
}
