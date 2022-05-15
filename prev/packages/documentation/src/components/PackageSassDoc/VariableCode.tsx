import type { ReactElement } from "react";
import { Switch, useChecked } from "@react-md/form";

import CodeBlock from "components/CodeBlock";
import type { FormattedVariableItem } from "utils/sassdoc";

export interface VariableCodeProps
  extends Pick<
    FormattedVariableItem,
    "name" | "value" | "compiled" | "overridable"
  > {
  baseId: string;
}

export default function VariableCode({
  baseId,
  name,
  value,
  compiled,
  overridable,
}: VariableCodeProps): ReactElement {
  const [enabled, handleChange] = useChecked(false);
  let code = `${value}${overridable ? " !default" : ""};`;
  if (enabled && compiled) {
    code = `${compiled};`;
  }

  const checkboxId = `${baseId}-compiled`;
  return (
    <>
      {compiled && (
        <Switch
          id={checkboxId}
          name="compiledToggle"
          checked={enabled}
          onChange={handleChange}
          label="Default compiled value"
        />
      )}
      <CodeBlock language="scss">{`$${name}: ${code}`}</CodeBlock>
    </>
  );
}
