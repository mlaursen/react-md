import React, { FC, Fragment } from "react";
import { Text } from "@react-md/typography";
import { CompiledExample } from "utils/sassdoc";
import CodeBlock from "components/Code/CodeBlock";
import { useCheckboxState, Switch } from "@react-md/form";
import styles from "./styles";

export interface ExamplesProps {
  baseId: string;
  examples: CompiledExample[] | undefined;
}

const Examples: FC<ExamplesProps> = ({ baseId, examples }) => {
  const [enabled, handleChange] = useCheckboxState(false);
  if (!examples) {
    return null;
  }

  return (
    <>
      <Text type="headline-4" margin="top">
        Examples
      </Text>
      {examples.map(({ code, type, description, compiled }, i) => (
        <Fragment key={`${description}-${type}`}>
          <Text type="headline-6" className={styles("examples")}>
            {description}
          </Text>
          {compiled && (
            <Switch
              id={`${baseId}-example ${i + 1}-compiled`}
              name="compiledToggle"
              checked={enabled}
              onChange={handleChange}
              label="Compiled output"
            />
          )}
          <CodeBlock language={type}>{enabled ? compiled : code}</CodeBlock>
        </Fragment>
      ))}
    </>
  );
};

export default Examples;
