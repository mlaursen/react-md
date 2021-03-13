import React, { ReactElement } from "react";
import { Switch, useChecked } from "@react-md/form";
import { Text } from "@react-md/typography";

import CodeBlock from "components/Code/CodeBlock";
import { CompiledExample } from "utils/sassdoc";

import styles from "./Example.module.scss";

interface ExampleProps extends CompiledExample {
  id: string;
}

export default function Example({
  id,
  code,
  type,
  description,
  compiled,
}: ExampleProps): ReactElement {
  const [enabled, handleChange] = useChecked(false);

  return (
    <>
      <Text type="headline-6" className={styles.description}>
        {description}
      </Text>
      {compiled && (
        <Switch
          id={id}
          name="compiledToggle"
          checked={enabled}
          onChange={handleChange}
          label="Compiled output"
        />
      )}
      <CodeBlock language={type}>{enabled ? compiled : code}</CodeBlock>
    </>
  );
}
